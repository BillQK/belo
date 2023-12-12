import "./Post.css";
import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
  FaEllipsisV,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { FiShare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import * as postsClient from "../../Services/postsClient";
import * as userClient from "../../Services/userClient";
import * as spotifyClient from "../../Services/spotifyClient";
import { useNavigate } from "react-router-dom";
const Post = ({ post, userProfile, type, otherUserID }) => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [liked, setLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(+post.likesCount);
  const [bookMarked, setBookMarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [savedAlbum, setSavedAlbum] = useState(post.spotifyContent);
  const [savedDescription, setSavedDescription] = useState(post.description);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [description, setDescription] = useState(post.description);
  const [error, setError] = useState(null);

  // Function to close the modal
  const closeEditModal = () => setIsEditing(false);
  // Function to open the modal
  const openEditModal = () => {
    setSearchTerm(post.spotifyContent.contentName);
    setDescription(post.description);
    setIsEditing(true);
  };
  const toggleLike = () => {
    setLiked(!liked);
    liked
      ? setNumberOfLikes(numberOfLikes - 1)
      : setNumberOfLikes(numberOfLikes + 1);
  };
  const toggleBookMark = () => {
    setBookMarked(!bookMarked);
  };
  const handleSave = async (event) => {
    const postToSave = {
      description: description,
    };

    if (selectedAlbum) {
      postToSave.spotifyContent = {
        contentName: selectedAlbum.name,
        contentType: selectedAlbum.type,
        contentID: selectedAlbum.id,
      };
    }
    try {
      const response = await postsClient.updatePost(post._id, postToSave);
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error appropriately
    }
    setSavedDescription(description);
    setSavedAlbum(selectedAlbum);
    closeEditModal();
  };

  const deletePost = async (event) => {
    try {
      const response = await postsClient.deletePost(post._id);
      if (response === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error appropriately
    }
    closeEditModal();
  };
  // Optional chaining to safely access userProfile properties
  const avatar = userProfile?.avatar;
  const userName = userProfile?.userName;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userClient.account(); // This should now include the accessToken

        setAccessToken(user.accesstoken);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error);
      }
    };

    fetchUser();
  }, []); // Fetch user details when component mounts

  useEffect(() => {
    const performSearch = async () => {
      try {
        const results = await spotifyClient.searchSpotify(
          searchTerm,
          accessToken
        );
        console.log(results);
        setSearchResults(results); // Assuming the response has an albums.items structure
        setSelectedAlbum(
          results.find((album) => album.id === post.spotifyContent.contentID)
        );
      } catch (error) {
        await userClient.signOut();
        navigate("/Register/Login");
        return;
      }
    };

    performSearch();
  }, [searchTerm]); // Run effect whenever searchTerm changes

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user ">
          {/* Use the avatar and userName variables with optional chaining */}
          <Link to={`/Dashboard/profile/${post.userId}`}>
            <img src={avatar} loading="lazy" alt="" className="post-image" />
          </Link>

          <Link to={`/Dashboard/profile/${post.userId}`}>
            {userName && <p>{"@" + userName}</p>}
          </Link>
          {type === "profile" && !otherUserID ? (
            <FaEllipsisV
              className="ms-auto"
              onClick={openEditModal}
              color="#6476dc"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="post-content">
        <p>{savedDescription}</p>
        {savedAlbum.contentType && savedAlbum.contentID ? (
          <iframe
            title="Spotify Embed: Recommendation Playlist "
            src={`https://open.spotify.com/embed/${savedAlbum.contentType}/${savedAlbum.contentID}?utm_source=generator&theme=1`}
            width="100%"
            height="100%"
            style={{ minHeight: "360px" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          ""
        )}
      </div>

      <div className="post-stat p-2">
        <span onClick={toggleLike}>
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span className="stat"> {numberOfLikes}</span>
        </span>
        <span>
          <FaRegComment />
          <span className="stat"> {post.comments}</span>
        </span>
        <span>
          <FiShare />
          <span className="stat"> {post.shares}</span>
        </span>
        <span onClick={toggleBookMark}>
          {bookMarked ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>
      <Modal show={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSave}>
          <div className="edit-body">
            <div className="instructions">
              <p>Please follow the guidelines below for updating a post:</p>
              <ul>
                <li>Keep your language respectful and inclusive.</li>
                <li>Avoid sharing sensitive personal information.</li>
                <li>Ensure your post does not violate any community rules.</li>
              </ul>
            </div>

            <div>
              <input
                className="search-box"
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-results d-flex flex-wrap">
                {searchResults.map((album, index) => (
                  <div
                    key={index}
                    className={`album-item ${
                      selectedAlbum && selectedAlbum.id === album.id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <label className="album-radio">
                      <input
                        type="radio"
                        name="albumSelection"
                        value={album.name}
                        checked={selectedAlbum && selectedAlbum.id === album.id}
                        onChange={() => setSelectedAlbum(album)}
                      />
                      <img
                        src={album.images[0].url}
                        alt={album.name}
                        height="50"
                        width="50"
                      />
                      {album.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              id="description"
              name="description"
              placeholder="Start typing your post..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
            ></textarea>

            <button className="my-3 save-button" type="submit">
              Update Post
            </button>
            <button
              className=" cancel-button"
              type="button"
              onClick={() => closeEditModal()}
            >
              Cancel
            </button>
            <button className="my-3 delete-button" onClick={deletePost}>
              Delete Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Post;
