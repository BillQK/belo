import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const FOLLOWS_API = `${BASE_API}/api/users`;
export const findAllFollows = async () => {
  const response = await request.get(`${FOLLOWS_API}/follows`);
  return response.data;
};
export const createUserFollowsUser = async (followerId, followedId) => {
  const response = await request.post(
    `${FOLLOWS_API}/${followerId}/follows/${followedId}`
  );
  return response.status;
};
export const deleteUserFollowsUser = async (followerId, followedId) => {
  const response = await request.delete(
    `${FOLLOWS_API}/${followerId}/follows/${followedId}`
  );
  return response.status;
};
export const findUsersFollowedByUser = async (userId) => {
  const response = await request.get(`${FOLLOWS_API}/${userId}/following`);

  return response.data;
};
export const findUsersFollowingUser = async (userId) => {
  const response = await request.get(`${FOLLOWS_API}/${userId}/followers`);
  return response.data;
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
    console.log(isFollowing);

    return isFollowing;
  } catch (error) {
    console.error("Error checking if user follows:", error);
    return false;
  }
};
