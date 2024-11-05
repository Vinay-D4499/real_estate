// src/components/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add sending logic here if needed
      setInputValue("");
    }
  };

  return (
    <div className="p-4 border-t flex items-center space-x-2 bg-white">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
