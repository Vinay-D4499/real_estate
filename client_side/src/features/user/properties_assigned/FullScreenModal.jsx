import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FullscreenModal = ({ media, isOpen, onClose }) => {
  const formatMediaUrl = (url) => {
    return url?.startsWith("https://") ? url : `https://${url}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl">
        <button
          className="top-4 right-4 absolute text-2xl text-white cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          dynamicHeight
        >
          {media.map((item, index) => (
            <div key={index}>
              {item.propertymedia_img && (
                <img
                  src={formatMediaUrl(item.propertymedia_img)}
                  alt={`Media ${index}`}
                  className="rounded w-full max-h-screen object-contain"
                />
              )}
              {item.propertymedia_video && (
                <video
                  controls
                  className="rounded w-full max-h-screen object-contain"
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
      </div>
    </div>
  );
};

export default FullscreenModal;
