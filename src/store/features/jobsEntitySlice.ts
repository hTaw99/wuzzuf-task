import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { getAllJobs, getJobsByIds } from "@/api/apiClient";
import { RootState } from "..";
import { fetchSkillsByIds } from "./skillSlice";

// ----------------------------------------------------------------------------
const jobsAdapter = createEntityAdapter<TJobEntity>({});

type TJob = {
  attributes: { title: string };
  id: string;
  relationships: { skills: { id: string }[] };
  type: string;
};
type TData = {
  data: {
    jobs: TJob[];
    meta: TMeta;
  };
};
type TMeta = {
  next: number;
  count: number;
};

type TJobEntity = {
  id: string;
  title: string;
  skillsId: string[];
  type: string;
};

type InitialState = {
  error: unknown;
  statusForAllJobs: "idle" | "success" | "loading" | "failed";
  statusForMultipleJobs: "idle" | "success" | "loading" | "failed";
  statusForSingleJob: "idle" | "success" | "loading" | "failed";
  jobs: EntityState<TJobEntity, string>;
  meta: TMeta;
};

const initialState: InitialState = {
  jobs: jobsAdapter.getInitialState(), // ids= [] entities = {1-asas-asas: {title,id,skillId,type},2-asas-asas: {} }
  error: "",
  statusForAllJobs: "idle",
  statusForMultipleJobs: "idle",
  statusForSingleJob: "idle",
  meta: {
    next: 0,
    count: 0,
  },
};

// ----------------------------------------------------------------------
export const fetchAllJobs = createAsyncThunk(
  "jobsEntity/fetchAllJobs",
  async (
    { limit, cursor }: { limit: number; cursor: number },
    { rejectWithValue }
  ) => {
    try {
      // ==============================================================
      const data = await getAllJobs<TData>({ limit, cursor });
      return data;
      // ==============================================================
    } catch (err) {
      // ==============================================================
      const errorObject: { message: string; stack: string } = err as {
        message: string;
        stack: string;
      };
      const message = errorObject?.message;
      return rejectWithValue(message);
      // ==============================================================
    }
  }
);

// export const fetchSingleJob = createAsyncThunk(
//   "jobsEntity/fetchSingleJob",
//   async (jobId: string, { rejectWithValue }) => {
//     try {
//       // ==============================================================
//       const data = await getSingleJob(jobId);
//       return data as { data: { job: TJob } };
//       // ==============================================================
//     } catch (err) {
//       // ==============================================================
//       const errorObject: { message: string; stack: string } = err as {
//         message: string;
//         stack: string;
//       };
//       const message = errorObject?.message;
//       return rejectWithValue(message);
//       // ==============================================================
//     }
//   }
// );

export const fetchJobsByIds = createAsyncThunk(
  "jobsEntity/fetchJobsByIds",
  async (jobsIds: string[], { rejectWithValue }) => {
    try {
      // ==============================================================
      const data = await getJobsByIds(jobsIds);
      return data as { data: { job: TJob } }[];
      // ==============================================================
    } catch (err) {
      // ==============================================================
      const errorObject: { message: string; stack: string } = err as {
        message: string;
        stack: string;
      };
      const message = errorObject?.message;
      return rejectWithValue(message);
      // ==============================================================
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // ------------------------------ Fetch All Jobs --------------------------------
    builder.addCase(fetchAllJobs.pending, (state) => {
      state.statusForAllJobs = "loading";
      state.statusForMultipleJobs = "idle";
      state.statusForSingleJob = "idle";
    });

    builder.addCase(fetchAllJobs.fulfilled, (state, { payload }) => {
      state.statusForAllJobs = "success";
      state.statusForMultipleJobs = "idle";
      state.statusForSingleJob = "idle";

      const newNormalizedJobsArr = payload.data.jobs.map((job) => ({
        id: job.id,
        type: job.type,
        title: job.attributes.title,
        skillsId: job.relationships.skills.map((skill) => skill.id),
      }));
      // Set in Entity
      jobsAdapter.addMany(state.jobs, newNormalizedJobsArr);
      state.meta = payload.data.meta;
    });

    builder.addCase(fetchAllJobs.rejected, (state, { payload }) => {
      state.statusForAllJobs = "failed";
      state.statusForMultipleJobs = "idle";
      state.statusForSingleJob = "idle";

      state.error = payload;
    });

    // ------------------------------ Fetch Single job By Id --------------------------------

    // builder.addCase(fetchSingleJob.pending, (state) => {
    //   state.statusForMultipleJobs = "loading";
    // });

    // builder.addCase(fetchSingleJob.fulfilled, (state, { payload }) => {
    //   state.statusForMultipleJobs = "success";
    //   const { id, type, attributes, relationships } = payload.data.job;
    //   jobsAdapter.addOne(state.jobs, {
    //     id: id,
    //     type: type,
    //     title: attributes.title,
    //     skillsId: relationships.skills.map((skill) => skill.id),
    //   });
    // });

    // builder.addCase(fetchSingleJob.rejected, (state, payload) => {
    //   state.statusForMultipleJobs = "failed";
    //   state.error = payload;
    // });

    // ------------------------------ Fetch Multible jobs By Id --------------------------------

    builder.addCase(fetchJobsByIds.pending, (state, action) => {
      const isForSingleFetch = action.meta.arg.length === 1;

      if (isForSingleFetch) {
        state.statusForSingleJob = "loading";
        state.statusForMultipleJobs = "idle";
        state.statusForAllJobs = "idle";
      } else {
        state.statusForMultipleJobs = "loading";
        state.statusForSingleJob = "idle";
        state.statusForAllJobs = "idle";
      }
    });
    builder.addCase(fetchJobsByIds.fulfilled, (state, action) => {
      const { payload } = action;
      const isForSingleFetch = action.meta.arg.length === 1;

      if (isForSingleFetch) {
        state.statusForSingleJob = "success";
        state.statusForMultipleJobs = "idle";
        state.statusForAllJobs = "idle";
      } else {
        state.statusForMultipleJobs = "success";
        state.statusForSingleJob = "idle";
        state.statusForAllJobs = "idle";
      }

      jobsAdapter.addMany(
        state.jobs,
        payload.map((job) => {
          return {
            id: job.data.job.id,
            type: job.data.job.type,
            title: job.data.job.attributes.title,
            skillsId: job.data.job.relationships.skills.map(
              (skill) => skill.id
            ),
          };
        })
      );
    });
    builder.addCase(fetchJobsByIds.rejected, (state, action) => {
      const { payload } = action;
      const isForSingleFetch = action.meta.arg.length === 1;

      if (isForSingleFetch) {
        state.statusForSingleJob = "failed";
        state.statusForMultipleJobs = "idle";
        state.statusForAllJobs = "idle";
      } else {
        state.statusForMultipleJobs = "failed";
        state.statusForSingleJob = "idle";
        state.statusForAllJobs = "idle";
      }

      state.error = payload;
    });

    builder.addCase(fetchSkillsByIds.fulfilled, (state) => {
      state.statusForMultipleJobs = "idle";
      state.statusForSingleJob = "idle";
      state.statusForAllJobs = "idle";
    });
  },
});

export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobsIds,
  selectTotal: selectTotalJobsNumber,
} = jobsAdapter.getSelectors<RootState>((state) => state.jobsEntity.jobs);

export default jobsSlice.reducer;
