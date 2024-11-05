import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getWhatsAppConversation } from './WhatsAppMessageAPI';

const ChatContainer = ({ whatsappUserId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadConversation = async () => {
      try {
        const data = await getWhatsAppConversation(whatsappUserId);
        setMessages(data); 
      } catch (error) {
        console.error("Failed to load conversation");
      }
    };

    loadConversation();
  }, [whatsappUserId]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border rounded-lg shadow-lg bg-white sm:max-w-lg md:max-w-2xl">
      <MessageList messages={messages} />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
