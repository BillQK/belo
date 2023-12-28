import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "../Profile/ProfileReducer";
import userSlice from "../User/userReducer";
import postCommentsSlice from "../components/Post/CommentComponents/CommentsReducer";
const store = configureStore({
  reducer: {
    user: userSlice,
    userProfile: userProfileSlice,
    postComments: postCommentsSlice,
  },
});

export default store;
