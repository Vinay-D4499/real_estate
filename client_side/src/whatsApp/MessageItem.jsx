import React, { useState } from 'react';
import MessageStatusList from './MessageStatusList';
import { format } from 'date-fns';

const MessageItem = ({ message }) => {
  const isSent = message.direction === 'outgoing';
  const { messageBody, mimeType, mediaPathUrl, timestamp, statuses, locationName, locationAddress, locationLatitude, locationLongitude } = message;
  console.log("===>",mediaPathUrl)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isImage = mimeType && mimeType.startsWith('image');
  const isVideo = mimeType && mimeType.startsWith('video');
  const isAudio = mimeType && mimeType.startsWith('audio');

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs md:max-w-sm lg:max-w-md p-2 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
      >
        {messageBody && (
          <p className="text-sm md:text-base whitespace-pre-wrap break-words font-sans mb-2">
            {messageBody}
          </p>
        )}

        {/* Display Media */}
        {isImage && (
          <img
            src={mediaPathUrl}
            alt="Sent media"
            className="w-full max-h-48 md:max-h-64 rounded-md mb-2 cursor-pointer"
            onClick={openModal}
          />
        )}
        {isVideo && (
          <video
            controls
            src={mediaPathUrl}
            className="w-full max-h-48 md:max-h-64 rounded-md mb-2"
            type={mimeType}
          />
        )}
        {isAudio && (
          <audio controls src={mediaPathUrl} className="w-full mb-2" />
        )}

        {/* Display Location */}
        {locationLatitude && locationLongitude && (
          <div className="bg-gray-100 p-2 rounded-lg mb-2">
            <p className="text-sm font-semibold">Location:</p>
            <p className="text-xs">{locationName || 'Unknown Location'}</p>
            <p className="text-xs text-gray-700">{locationAddress}</p>
            <a
              href={`https://www.google.com/maps?q=${locationLatitude},${locationLongitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs mt-1 block"
            >
              View on Google Maps
            </a>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-600 mt-1 block text-right">
          {format(new Date(timestamp), 'MMMM d, yyyy h:mm a')}
        </span>

        {/* Message Statuses */}
        {statuses && <MessageStatusList statuses={statuses} />}

        {/* Full-Screen Image Modal */}
        {isModalOpen && isImage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            onClick={closeModal} 
          >
            <div
              className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <img
                src={mediaPathUrl}
                alt="Full screen media"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
