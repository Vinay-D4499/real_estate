// src/components/MessageInput.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../config/baseURL';

const MessageInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // Handler to send text message
  const sendTextMessage = async () => {
    setIsSending(true);
    try {
      const response = await axios.post(`${baseURL}/api/whatsAppWebhook/sendText`, {
        to: '919845964499',
        body: inputValue,
      });
      console.log("Text message sent:", response.data);
    } catch (error) {
      console.error("Error sending text message:", error);
    } finally {
      setIsSending(false);
      setInputValue("");
    }
  };

  // Handler to send media message
  const sendMediaMessage = async () => {
    if (!mediaFile) return;

    setIsSending(true);
    const formData = new FormData();
    formData.append("to", "919845964499");
    formData.append("media", mediaFile);
    formData.append("caption", inputValue);

    try {
      const response = await axios.post(`${baseURL}/api/whatsAppWebhook/sendMedia`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Media message sent:", response.data);
    } catch (error) {
      console.error("Error sending media message:", error);
    } finally {
      setIsSending(false);
      setInputValue("");
      setMediaFile(null);
    }
  };

  // Handler for send button click
  const handleSend = () => {
    if (mediaFile) {
      sendMediaMessage();
    } else if (inputValue.trim()) {
      sendTextMessage();
    }
  };

  return (
    <div className="p-2 sm:p-4 border-t flex items-center space-x-2 bg-white flex-wrap sm:flex-nowrap">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 w-full sm:w-auto mb-2 sm:mb-0"
        placeholder="Type a message or add caption for media..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMediaFile(e.target.files[0])}
        className="hidden"
        id="mediaUpload"
      />
      <label
        htmlFor="mediaUpload"
        className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition text-sm sm:text-base"
      >
        {mediaFile ? "Media Selected" : "Attach Media"}
      </label>
      <button
        onClick={handleSend}
        disabled={isSending}
        className={`bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-600 transition text-sm sm:text-base ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;
