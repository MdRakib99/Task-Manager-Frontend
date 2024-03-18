import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../StateSlice/setting-slice";
import taskReducer from "../StateSlice/task-slice";
import summaryReducer from "../StateSlice/summary-slice";
import profileReducer from "../StateSlice/profile-slice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    task: taskReducer,
    summary: summaryReducer,
    profile: profileReducer,
  },
});
