import React, { useState } from 'react';
import MessageStatusList from './MessageStatusList';

const MessageItem = ({ message }) => {
  const isSent = message.direction === 'outgoing';
  const { messageBody, mediaType, mediaPathUrl, mimeType, timestamp, statuses } = message;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          }`}
      >
        {messageBody && (
          <p className="text-sm whitespace-pre-wrap break-words font-sans mb-2">
            {messageBody}
          </p>
        )}

        {mediaType === 'image' && (
          <img
            src={mediaPathUrl}
            alt="Sent media"
            className="w-full max-h-64 rounded-md mb-2 cursor-pointer"
            onClick={openModal}
          />
        )}
        {mediaType === 'video' && (
          <video
            controls
            src={mediaPathUrl}
            className="w-full max-h-64 rounded-md mb-2"
            type={mimeType}
          />
        )}
        {mediaType === 'audio' && (
          <audio controls src={mediaPathUrl} className="w-full mb-2" />
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-600 mt-1 block text-right">
          {new Date(timestamp).toLocaleTimeString()}
        </span>

        {/* Message Statuses */}
        {statuses && <MessageStatusList statuses={statuses} />}

        {isModalOpen && mediaType === 'image' && (
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
