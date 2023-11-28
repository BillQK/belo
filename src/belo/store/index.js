import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "../Profile/ProfileReducer";

const store = configureStore({
  reducer: {
    userProfile: userProfileSlice,
  },
});

export default store;
