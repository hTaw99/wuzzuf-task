import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getAllJobs } from "@/api/apiClient";

// ----------------------------------------------------------------------------
type TData = {
  data: {
    jobs: TJob[];
    meta: TMeta;
  };
};

type TMeta = {
  next?: number;
  count: number;
};

type TSkill = {
  id: string;
};

type TJob = {
  attributes: { title: string };
  id: string;
  relationships: { skills: TSkill[] };
  type: string;
};

interface InitialState {
  error: unknown;
  status: "idle" | "success" | "loading" | "failed";
  jobs: TJob[];
  meta: TMeta;
}

// ----------------------------------------------------------------------
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllJobs();
      return data as TData;
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
// -----------------------------------------------------------------------

const initialState: InitialState = {
  error: "",
  status: "idle",
  jobs: [],
  meta: { next: 0, count: 0 },
};

// ------------------------------------------------------------------------

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllJobs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllJobs.fulfilled, (state, { payload }) => {
      state.status = "success";
      // jobsAdapter.setAll(state, payload.data.jobs);
      // console.log(jobsAdapter.getInitialState());
      state.jobs = payload.data.jobs;
      state.meta = payload.data.meta;
    });
    builder.addCase(fetchAllJobs.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});


// export const {} = jobSlice.actions;

export default jobsSlice.reducer;
