import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getWhatsAppConversation } from './WhatsAppMessageAPI';
import ChatList from './ChatList';

const ChatContainer = () => {
  const [whatsappUserId, setWhatsappUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (whatsappUserId) {
      const loadConversation = async () => {
        try {
          const data = await getWhatsAppConversation(whatsappUserId);
          setMessages(data);
        } catch (error) {
          console.error("Failed to load conversation");
        }
      };

      loadConversation();
    }
  }, [whatsappUserId]);

  return (
    <div className="flex h-screen">
      <ChatList setWhatsappUserId={setWhatsappUserId} /> 

      <div className="flex flex-col w-full border rounded-lg shadow-lg bg-white">
        {whatsappUserId ? (
          <>
            <MessageList messages={messages} /> 
            <MessageInput /> 
          </>
        ) : (
          <div className="flex justify-center items-center text-xl text-gray-500 h-full">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
