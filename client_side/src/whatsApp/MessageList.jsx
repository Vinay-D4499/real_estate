import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
    {messages.map((message) => (
      <MessageItem key={message.messageId} message={message} />
    ))}
  </div>
);

export default MessageList;
