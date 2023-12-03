import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export the actions generated by `createSlice`
export const { updateUserProfile } = userProfileSlice.actions;

// Export the reducer from the generated slice
export default userProfileSlice.reducer;
