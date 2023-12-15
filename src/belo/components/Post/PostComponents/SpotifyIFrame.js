import { useState, useEffect, useRef } from "react";
import LoadingComponent from "./SpotifyIFrameComponents/LoadingComponents";
import ReloadingButton from "./SpotifyIFrameComponents/ReloadingButton";

const SpotifyIframe = ({ contentType, contentID }) => {
  const [iframeKey, setIframeKey] = useState(Date.now()); // Unique key for the iframe
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const loadTimeoutRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("0px");

  const handleIframeLoad = () => {
    clearTimeout(loadTimeoutRef.current);
    setIsLoading(false);
    setIframeHeight("360px");
  };

  const retryLoadingIframe = () => {
    setIsLoading(true);
    setError(false);
    setIframeHeight("0px");
    setIframeKey(Date.now()); // Change the key to force re-render
  };

  useEffect(() => {
    loadTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setError(true);
      }
    }, 5000); // 3 seconds timeout

    return () => clearTimeout(loadTimeoutRef.current);
  }, [isLoading]);

  return (
    <>
      {isLoading && !error && <LoadingComponent />}
      {error && <ReloadingButton retry={retryLoadingIframe} />}
      {!error && (
        <iframe
          key={iframeKey}
          title="Spotify Embed: Recommendation Playlist"
          src={`https://open.spotify.com/embed/${contentType}/${contentID}?utm_source=generator&theme=1`}
          width="100%"
          height={iframeHeight}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={handleIframeLoad}
          loading="lazy"
        />
      )}
    </>
  );
};

export default SpotifyIframe;
