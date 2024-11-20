import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MediaCarousel = ({ media, onMediaClick }) => {
  const formatMediaUrl = (url) => {
    return url?.startsWith("https://") ? url : `https://${url}`;
  };

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      dynamicHeight
    >
      {media?.map((item, index) => (
        <div key={index} onClick={() => onMediaClick(media)}>
          {item.propertymedia_img && (
            <img
              src={formatMediaUrl(item.propertymedia_img)}
              alt={`Media ${index}`}
              className="rounded w-full h-56 cursor-pointer cursor object-contain"
            />
          )}
          {item.propertymedia_video && (
            <video
              controls
              className="rounded w-full h-56 cursor-pointer object-cover"
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
