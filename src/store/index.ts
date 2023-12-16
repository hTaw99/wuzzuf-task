import { configureStore } from "@reduxjs/toolkit";
// import jobsSlice from "./features/jobsSlice";
import skillSlice from "./features/skillSlice";
import searchSlice from "./features/searchSlice";
// import jobSlice from "./features/jobSlice";
import jobsEntitySlice from "./features/jobsEntitySlice";

const store = configureStore({
  reducer: {
    // jobs: jobsSlice,
    skill: skillSlice,
    search: searchSlice,
    // job: jobSlice,
    jobsEntity:jobsEntitySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
