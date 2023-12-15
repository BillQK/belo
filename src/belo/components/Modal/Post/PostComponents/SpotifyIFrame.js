import React, { useState } from "react";
import LoadingComponent from "../../../Utility/LoadingComponents";

const SpotifyIframe = ({ contentType, contentID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("0px");

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeHeight("360px");
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
    setIframeHeight("0px");
  };

  const retryLoadingIframe = () => {
    setIsLoading(true);
    setError(false);
    setIframeHeight("0px");
  };

  return (
    <>
      {isLoading && <LoadingComponent />}
      {error && (
        <div>
          <p>Failed to load content. Please try again.</p>
          <button onClick={retryLoadingIframe}>Retry</button>
        </div>
      )}
      <iframe
        title="Spotify Embed: Recommendation Playlist"
        src={`https://open.spotify.com/embed/${contentType}/${contentID}?utm_source=generator&theme=1`}
        width="100%"
        height={iframeHeight}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        loading="lazy"
      />
    </>
  );
};

export default SpotifyIframe;
