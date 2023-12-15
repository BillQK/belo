import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import SpotifyIframe from "./PostComponents/SpotifyIFrame";
import PostHeader from "./PostComponents/PostHeader";
import PostStats from "./PostComponents/PostStats";
import PostEditForm from "./PostComponents/PostEditForm";
import usePostDetails from "./hooks/usePostDetails";
import useSavePost from "./hooks/useSavePost";
import useDeletePost from "./hooks/useDeletePost";
import useSpotifySearch from "./hooks/useSpotifySearch";
import * as likesClient from "../../Services/likesClient";
import "./Post.css";

const Post = ({ post, userProfile, type, otherUserID }) => {
  const navigate = useNavigate();
  const [postState, setPostState] = useState({
    bookMarked: false,
    isEditing: false,
    description: post.description,
    searchTerm: "",
    savedAlbum: post.spotifyContent,
  });

  const {
    user,
    liked,
    setLiked,
    numberOfLikes,
    setNumberOfLikes,
    error,
    accessToken,
  } = usePostDetails(post._id);

  const { savePost } = useSavePost();
  const { deletePost } = useDeletePost();

  const { searchResults, selectedAlbum, setSelectedAlbum } = useSpotifySearch(
    postState.searchTerm,
    accessToken,
    post.spotifyContent?.contentID
  );

  const toggleLike = async () => {
    if (!user) {
      navigate("/Register/login");
      return;
    }
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    if (newLikedStatus) {
      setNumberOfLikes(numberOfLikes + 1);
      await likesClient.createLike(user._id, post._id);
    } else {
      setNumberOfLikes(numberOfLikes - 1);
      await likesClient.deleteLike(user._id, post._id);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const postToSave = {
      description: postState.description,
      spotifyContent: selectedAlbum
        ? {
            contentName: selectedAlbum.name,
            contentType: selectedAlbum.type,
            contentID: selectedAlbum.id,
          }
        : null,
    };
    savePost(post._id, postToSave);
    setPostState((ps) => ({ ...ps, isEditing: false }));
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    deletePost(post._id);
  };

  const openEditModal = () => {
    setPostState((ps) => ({
      ...ps,
      isEditing: true,
      searchTerm: post.spotifyContent?.contentName,
    }));
  };

  const closeEditModal = () => {
    setPostState((ps) => ({ ...ps, isEditing: false }));
  };

  const toggleBookMark = () => {
    setPostState((ps) => ({ ...ps, bookMarked: !ps.bookMarked }));
  };

  return (
    <div className="post">
      <PostHeader
        userId={post.userId}
        avatar={userProfile?.avatar}
        userName={userProfile?.userName}
        isEditable={type === "profile" && !otherUserID}
        onEdit={openEditModal}
      />
      <div className="post-content">
        <p>{postState.description}</p>
        {postState.savedAlbum.contentType && postState.savedAlbum.contentID && (
          <SpotifyIframe
            contentType={postState.savedAlbum.contentType}
            contentID={postState.savedAlbum.contentID}
          />
        )}
      </div>

      <PostStats
        liked={liked}
        numberOfLikes={numberOfLikes}
        onLike={toggleLike}
        comments={post.comments}
        shares={post.shares}
        bookMarked={postState.bookMarked}
        onBookmark={toggleBookMark}
      />

      {postState.isEditing && (
        <Modal show={postState.isEditing} onClose={closeEditModal}>
          <PostEditForm
            description={postState.description}
            searchTerm={postState.searchTerm}
            searchResults={searchResults}
            selectedAlbum={selectedAlbum}
            onDescriptionChange={(e) =>
              setPostState((ps) => ({ ...ps, description: e.target.value }))
            }
            onSearchTermChange={(e) =>
              setPostState((ps) => ({ ...ps, searchTerm: e.target.value }))
            }
            onAlbumSelect={setSelectedAlbum}
            onSave={handleSave}
            onCancel={closeEditModal}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
};

export default Post;
