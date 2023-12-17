import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getSkillsByIds } from "@/api/apiClient";
import { RootState } from "..";
import { fetchAllJobs, fetchJobsByIds } from "./jobsEntitySlice";
import { TSingleSkill, TSkillEntity } from "@/types/skillTypes";
import { TJobEntity } from "@/types/jobsTypes";

// ----------------------------------------------------------------------

const skillsAdapter = createEntityAdapter<TSkillEntity>({});
const skillJobsAdapter = createEntityAdapter<TJobEntity>({});

// ids: [], entities: {skillId: [TEntityJob]}

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

export const fetchSkillsByIds = createAsyncThunk<TSingleSkill[], string[]>(
  "skill/fetchSkillsByIds",
  async (skillId, { rejectWithValue }) => {
    try {
      const skills = await getSkillsByIds(skillId);
      return skills;
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
  uniqueSkillsIds: string[];
  skills: EntityState<TSkillEntity, string>;
  skillJobs: EntityState<TJobEntity, string>;
}

const initialState: InitialState = {
  error: "",
  uniqueSkillsIds: [],
  statusForMultipleSkills: "idle",
  statusForSingleSkill: "idle",
  skills: skillsAdapter.getInitialState(),
  skillJobs: skillJobsAdapter.getInitialState(),
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

    builder.addCase(fetchJobsByIds.fulfilled, (state, action) => {
      // const isForSingleFetch = action.meta.arg.length === 1;

      // if (isForSingleFetch) {
      //   let obj = {};

      const arr = action.payload.map((job) => ({
        id: job.data.job.id,
        title: job.data.job.attributes.title,
        skillsId: job.data.job.relationships.skills.map((skill) => skill.id),
        type: job.data.job.type,
      }));

      //   obj[action.meta.arg[0]] = arr;

      //   state.skillJobs = obj;
      // }

      skillJobsAdapter.addMany(state.skillJobs, arr);

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

export const {
  selectAll: selectRelatedJobs,
  selectById: selectRelatedJobById,
  selectIds: selectRelatedJobsIds,
  selectTotal: selectRelatedJobsTotalNumber,
} = skillJobsAdapter.getSelectors<RootState>((state) => state.skill.skillJobs);

// export const {} = jobSlice.actions;

export default skillSlice.reducer;
