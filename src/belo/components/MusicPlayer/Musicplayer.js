import React, { useState } from "react";
import "./Musicplayer.css";
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress in percentage

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // You would also control the music playback here
  };

  const onProgressChange = (e) => {
    setProgress(e.target.value);
    // Here you would also update the playback position of the music
  };

  return (
    <div className="music-player ">
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={onProgressChange}
      />
      <div className="time-indicators">
        <span>0:00</span>
        <span>0:30</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
