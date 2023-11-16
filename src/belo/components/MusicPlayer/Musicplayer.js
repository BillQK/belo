import React from "react";
import "./Musicplayer.css";

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <div className="play-button" />
      <div className="progress-bar-container">
        <div className="progress-bar" />
      </div>
      <div className="timestamp">0:00 / 3:30</div>
    </div>
  );
};

export default MusicPlayer;
