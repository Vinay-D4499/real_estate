import React from 'react';
import MessageStatusList from './MessageStatusList';

const MessageItem = ({ message }) => {
  const isSent = message.direction === 'outgoing';
  const { messageBody, mediaType, mediaPathUrl, mimeType, timestamp, statuses } = message;

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {/* Display Text Message with Emoji Support */}
        {messageBody && (
          <p className="text-sm whitespace-pre-wrap break-words font-sans mb-2">
            {messageBody}
          </p>
        )}

        {/* Display Media Types */}
        {mediaType === 'image' && (
          <img
            src={mediaPathUrl}
            alt="Sent media"
            className="w-full max-h-64 rounded-md mb-2"
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
      </div>
    </div>
  );
};

export default MessageItem;
