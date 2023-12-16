import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleJob } from "@/api/apiClient";

// ----------------------------------------------------------------------------
type TData = {
  data: {
    job: TJob;
  };
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

type TJobEntity = {
  title: string;
  id: string;
  skillsId: string[];
  type: string;
};

interface InitialState {
  error: unknown;
  status: "idle" | "success" | "loading" | "failed";
  job: TJobEntity;
}
// ----------------------------------------------------------------------
export const fetchSingleJob = createAsyncThunk(
  "jobs/fetchSingleJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const data = await getSingleJob(jobId);
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
  job: {
    title: "",
    id: "",
    skillsId: [],
    type: "string",
  },
};

// ------------------------------------------------------------------------

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleJob.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleJob.fulfilled, (state, { payload }) => {
      const { id, attributes, relationships, type } = payload.data.job;
      state.status = "success";
      state.job = {
        id: id,
        type: type,
        title: attributes.title,
        skillsId: relationships.skills.map((skill) => skill.id),
      };
    });
    builder.addCase(fetchSingleJob.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

// export const {} = jobSlice.actions;

export default jobSlice.reducer;
