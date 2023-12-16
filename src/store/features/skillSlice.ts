import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getSkillsByIds } from "@/api/apiClient";
import { RootState } from "..";
import { fetchAllJobs, fetchJobsByIds } from "./jobsEntitySlice";

// ----------------------------------------------------------------------
type TSkill = {
  data: {
    skill: {
      id: string;
      type: string;
      attributes: {
        name: string;
        type: string;
        importance: number;
        level: number;
      };
      relationships: {
        jobs: { id: string }[];
        skills: { id: string }[];
      };
    };
  };
};

type TSkillEntity = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: number;
    level: number;
  };
  relationships: {
    jobs: string[]; // was {};
    skills: string[]; // was {};
  };
};

const skillsAdapter = createEntityAdapter<TSkillEntity>({});

// -----------------------------------------------------------------------------------

// export const fetchSingleSkill = createAsyncThunk(
//   "skill/fetchSingleSkill",
//   async (skillId: string, { rejectWithValue }) => {
//     try {
//       const skill = await getSkill(skillId);
//       return skill as TSkill;
//     } catch (err) {
//       const errorObject: { message: string; stack: string } = err as {
//         message: string;
//         stack: string;
//       };
//       const message = errorObject?.message;
//       return rejectWithValue(message);
//     }
//   }
// );

export const fetchSkillsByIds = createAsyncThunk(
  "skill/fetchSkillsByIds",
  async (skillId: string[], { rejectWithValue }) => {
    try {
      const skills = await getSkillsByIds(skillId);
      return skills as TSkill[];
    } catch (err) {
      const errorObject: { message: string; stack: string } = err as {
        message: string;
        stack: string;
      };
      const message = errorObject?.message;
      return rejectWithValue(message);
    }
  }
);

interface InitialState {
  error: unknown;
  statusForMultipleSkills: "idle" | "success" | "loading" | "failed";
  statusForSingleSkill: "idle" | "success" | "loading" | "failed";
  skills: EntityState<TSkillEntity, string>;
  uniqueSkillsIds: string[];
}

const initialState: InitialState = {
  error: "",
  uniqueSkillsIds: [],
  statusForMultipleSkills: "idle",
  statusForSingleSkill: "idle",
  skills: skillsAdapter.getInitialState(),
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ------------------------------ Fetch Single Skill By Id --------------------------------
    // builder.addCase(fetchSingleSkill.pending, (state) => {
    //   state.status = "loading";
    // });
    // builder.addCase(fetchSingleSkill.fulfilled, (state, { payload }) => {
    //   const { relationships } = payload.data.skill;
    //   state.status = "success";
    //   skillsAdapter.addOne(state.skills, {
    //     ...payload.data.skill,
    //     relationships: {
    //       jobs: relationships.jobs.map((job) => job.id),
    //       skills: relationships.skills.map((skill) => skill.id),
    //     },
    //   });
    // });
    // builder.addCase(fetchSingleSkill.rejected, (state, { payload }) => {
    //   state.status = "failed";
    //   state.error = payload;
    // });

    // ------------------------------ Fetch Multible Skill By Id --------------------------------

    builder.addCase(fetchSkillsByIds.pending, (state, action) => {
      const isForSingleFetch = action.meta.arg.length === 1;
      if (isForSingleFetch) {
        state.statusForMultipleSkills = "idle";
        state.statusForSingleSkill = "loading";
      } else {
        state.statusForMultipleSkills = "loading";
        state.statusForSingleSkill = "idle";
      }
    });

    builder.addCase(fetchSkillsByIds.fulfilled, (state, action) => {
      const { payload } = action;
      const isForSingleFetch = action.meta.arg.length === 1;
      if (isForSingleFetch) {
        state.statusForSingleSkill = "success";
        state.statusForMultipleSkills = "idle";
      } else {
        state.statusForMultipleSkills = "success";
        state.statusForSingleSkill = "idle";
      }
      skillsAdapter.addMany(
        state.skills,
        payload.map((skill) => ({
          ...skill.data.skill,
          relationships: {
            jobs: skill.data.skill.relationships.jobs.map((job) => job.id),
            skills: skill.data.skill.relationships.skills.map(
              (skill) => skill.id
            ),
          },
        }))
      );
    });

    builder.addCase(fetchSkillsByIds.rejected, (state, action) => {
      const { payload } = action;
      const isForSingleFetch = action.meta.arg.length === 1;

      if (isForSingleFetch) {
        state.statusForSingleSkill = "failed";
        state.statusForMultipleSkills = "idle";
      } else {
        state.statusForMultipleSkills = "failed";
        state.statusForSingleSkill = "idle";
      }

      state.error = payload;
    });

    // --------------------------------------------------------------

    builder.addCase(fetchAllJobs.fulfilled, (state, { payload }) => {
      state.statusForMultipleSkills = "idle";
      state.statusForSingleSkill = "idle";

      const uniqueSkillsArr = payload.data.jobs
        .flatMap((job) => job.relationships.skills)
        .reduce((acc: string[], currentValue) => {
          if (!acc.find((el) => el === currentValue.id)) {
            acc.push(currentValue.id);
          }

          return acc;
        }, []);
      state.uniqueSkillsIds = uniqueSkillsArr;
    });

    builder.addCase(fetchJobsByIds.fulfilled, (state) => {
      state.statusForMultipleSkills = "idle";
      state.statusForSingleSkill = "idle";
    });
  },
});

export const {
  selectAll: selectActualAllSkills,
  selectById: selectActualSkillById,
  selectIds: selectActualSkillsIds,
  selectTotal: selectTotalNumber,
} = skillsAdapter.getSelectors<RootState>((state) => state.skill.skills);

// export const {} = jobSlice.actions;

export default skillSlice.reducer;
