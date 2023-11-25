import EndOfFeed from "../EndOfFeed/EndOfFeed";
import Post from "../Post/Post";
import "./Feed.css";
const userPosts = [
  {
    username: "@johndoe",
    imageUrl: "/img/music.png",
    musicUrl: "/img/music.png",
    songTitle: "Song Title",
    artistName: "Artist Name",
    description: "Walking and listening to this",
    likes: 123,
    comments: 4,
    shares: 2,
  },
  {
    username: "@janedoe",
    imageUrl: "/img/crowd.png",
    musicUrl: "/img/crowd.png",
    songTitle: "Song Title",
    artistName: "Artist Name",
    description:
      "Walking and listening to this Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.",
    likes: 98,
    comments: 7,
    shares: 3,
  },
  {
    username: "@janedoe",
    imageUrl: "/img/crowd.png",
    musicUrl: "/img/crowd.png",
    songTitle: "Song Title",
    artistName: "Artist Name",
    description:
      "Walking and listening to this Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.",
    likes: 98,
    comments: 7,
    shares: 3,
  },
  {
    username: "@janedoe",
    imageUrl: "/img/crowd.png",
    musicUrl: "/img/crowd.png",
    songTitle: "Song Title",
    artistName: "Artist Name",
    description:
      "Walking and listening to this Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.Nothing beats a sunset hike in the mountains.",
    likes: 98,
    comments: 7,
    shares: 3,
  },
];
const Feed = () => {
  return (
    <div className="feed">
      {userPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
      <EndOfFeed />
    </div>
  );
};
export default Feed;
