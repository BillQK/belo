import axios from "axios";
const request = axios.create({
  withCredentials: true,
  timeout: 5000, // Timeout set to 5000 milliseconds (5 seconds)
});
const handleError = (error) => {
  if (error.code === "ECONNABORTED") {
    console.error("Request timed out, refreshing the page...");
    window.location.reload();
  } else {
    console.error(error);
  }
};

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const FOLLOWS_API = `${BASE_API}/api/users`;
export const findAllFollows = async () => {
  try {
    const response = await request.get(`${FOLLOWS_API}/follows`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const createUserFollowsUser = async (followerId, followedId) => {
  try {
    const response = await request.post(
      `${FOLLOWS_API}/${followerId}/follows/${followedId}`
    );
    return response.status;
  } catch (error) {
    handleError(error);
  }
};
export const deleteUserFollowsUser = async (followerId, followedId) => {
  try {
    const response = await request.delete(
      `${FOLLOWS_API}/${followerId}/follows/${followedId}`
    );
    return response.status;
  } catch (error) {
    handleError(error);
  }
};
export const findUsersFollowedByUser = async (userId) => {
  try {
    const response = await request.get(`${FOLLOWS_API}/${userId}/following`);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const findUsersFollowingUser = async (userId) => {
  try {
    const response = await request.get(`${FOLLOWS_API}/${userId}/followers`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const checkIfUserFollows = async (currentUserId, otherUserId) => {
  try {
    // Get the list of users followed by 'currentUserId'
    const relationships = await findUsersFollowingUser(otherUserId);

    // Check if 'otherUserId' is in the list of followed users
    const isFollowing = relationships.some(
      (entry) =>
        entry.followed === otherUserId && currentUserId === entry.follower._id
    );
    // console.log(isFollowing);

    return isFollowing;
  } catch (error) {
    handleError(error);
  }
};
