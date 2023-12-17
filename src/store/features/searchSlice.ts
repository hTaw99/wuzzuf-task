import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchedJobs } from "@/api/apiClient";
import { fetchSkillsByIds } from "./skillSlice";
import { TData, TJobEntity, TMeta } from "@/types/jobsTypes";

// -------------------------------------------------------

interface InitialState {
  error: unknown;
  status: "idle" | "success" | "loading" | "failed";
  searchResultJobs: TJobEntity[];
  queryKeyword: string;
  meta: TMeta;
  suggestion: string[];
  isSuggestionListOpen: boolean;
  searchHistory: TJobEntity[];
}

// -----------------------------------------------------------------------

export const fetchSearchedJobs = createAsyncThunk(
  "search/fetchSearchedJobs",
  async (
    { query }: { query: string; button?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const jobs = await getSearchedJobs(query.toLowerCase());
      return jobs as TData;
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

const initialState: InitialState = {
  error: "",
  queryKeyword: "",
  status: "idle",
  searchResultJobs: [],
  suggestion: [],
  isSuggestionListOpen: false,
  meta: { next: 0, count: 0 },
  searchHistory: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSuggestionList(state) {
      state.isSuggestionListOpen = true;
    },

    closeSuggestionList(state) {
      state.isSuggestionListOpen = false;
    },
    setQueryKeyword(state, action: PayloadAction<string>) {
      state.queryKeyword = action.payload;
    },
    clearSuggestion(state) {
      state.suggestion = [];
    },
    setAsViewedJob(state, action: PayloadAction<TJobEntity>) {
      const { payload } = action;
      const viewedJob = state.searchHistory.find(
        (job) => job.id === payload.id
      );
      if (viewedJob) {
        const viewedJobIdx = state.searchHistory.indexOf(viewedJob);
        state.searchHistory.splice(viewedJobIdx, 1);
        state.searchHistory.unshift(viewedJob);
      } else {
        state.searchHistory.unshift({ ...payload });
        // state.recentlyViewedProductsIds.unshift(payload._id);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSearchedJobs.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(
      fetchSearchedJobs.fulfilled,
      (state, action: PayloadAction<TData>) => {
        state.status = "success";
        state.searchResultJobs = action.payload.data.jobs.map((job) => {
          return {
            id: job.id,
            type: job.type,
            title: job.attributes.title,
            skillsId: job.relationships.skills.map((skill) => skill.id),
          };
        });
        state.meta = action.payload.data.meta;
      }
    );

    builder.addCase(fetchSearchedJobs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchSkillsByIds.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  openSuggestionList,
  closeSuggestionList,
  setQueryKeyword,
  clearSuggestion,
  setAsViewedJob,
} = searchSlice.actions;

export default searchSlice.reducer;
