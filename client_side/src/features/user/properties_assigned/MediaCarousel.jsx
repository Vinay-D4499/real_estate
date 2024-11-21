import React, { useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MediaCarousel = ({ media, onMediaClick }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const formatMediaUrl = (url) => {
    return url?.startsWith("https://") ? url : `https://${url}`;
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (carouselRef.current) {
      carouselRef.current.stop(); // Pause the carousel while the video is playing
    }
  };

  const handleVideoPauseOrEnd = () => {
    setIsVideoPlaying(false);
    if (carouselRef.current) {
      carouselRef.current.start(); // Resume the carousel after the video ends or is paused
    }
  };

  return (
    <Carousel
      ref={carouselRef}
      autoPlay={!isVideoPlaying} // Disable autoplay when a video is playing
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000} // Default interval for non-video slides
      dynamicHeight
    >
      {media?.map((item, index) => (
        <div key={index} onClick={() => onMediaClick(media)}>
          {item.propertymedia_img && (
            <img
              src={formatMediaUrl(item.propertymedia_img)}
              alt={`Media ${index}`}
              className="rounded w-full h-56 cursor-pointer object-contain"
            />
          )}
          {item.propertymedia_video && (
            <video
              controls
              className="rounded w-full h-56 cursor-pointer object-cover"
              onPlay={handleVideoPlay}
              onPause={handleVideoPauseOrEnd}
              onEnded={handleVideoPauseOrEnd}
            >
              <source
                src={formatMediaUrl(item.propertymedia_video)}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default MediaCarousel;
