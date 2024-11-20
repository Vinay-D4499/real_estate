import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FullscreenModal = ({ media, isOpen, onClose }) => {
  const videoRef = useRef(null);

  const formatMediaUrl = (url) => {
    return url?.startsWith("https://") ? url : `https://${url}`;
  };

  // Effect to stop the video when the modal is closed
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to the start
    }
  }, [isOpen]);

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent closing the modal when clicking inside it
  };

  if (!isOpen) return null;

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-80"
      onClick={onClose} // Close modal on background click
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={handleModalClick} // Prevent modal close when clicking inside content
      >
        <button
          className="top-4 right-4 z- z-50 absolute text-2xl text-indigo-500 cursor-pointer"
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
                <div>
                  <video
                    ref={videoRef} // Reference to video element
                    controls
                    className="rounded w-full max-h-screen object-contain"
                  >
                    <source
                      src={formatMediaUrl(item.propertymedia_video)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FullscreenModal;
