// src/components/MessageItem.jsx
import React from 'react';
import MessageStatusList from './MessageStatusList';

const MessageItem = ({ message }) => {
  const isSent = message.direction === 'outgoing';

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.messageBody}</p>
        <span className="text-xs text-gray-600 mt-1 block text-right">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        {message.statuses && <MessageStatusList statuses={message.statuses} />}
      </div>
    </div>
  );
};

export default MessageItem;
