import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "../Profile/ProfileReducer";
import userSlice from "../User/userReducer";
const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
  },
});

export default store;
