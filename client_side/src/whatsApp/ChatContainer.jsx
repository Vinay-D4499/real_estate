import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getWhatsAppConversation } from './WhatsAppMessageAPI';
import ChatList from './ChatList';

const ChatContainer = () => {
  const [whatsappUserId, setWhatsappUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  // let countRequest = 0;
  useEffect(() => {
    let intervalId;

    const loadConversation = async () => {
      // console.log("Fetched conversation : ",countRequest++)
      try {
        const data = await getWhatsAppConversation(whatsappUserId);
        setMessages((prevMessages) => {
          // Assuming each message has a unique ID or timestamp
          const newMessages = data.filter(
            (msg) => !prevMessages.some((existingMsg) => existingMsg.id === msg.id)
          );
          return [...prevMessages, ...newMessages];
        });
      } catch (error) {
        console.error("Failed to load conversation:", error);
      }
    };

    // if (whatsappUserId) {
    //   loadConversation(); // Initial load
    //   intervalId = setInterval(loadConversation, 5000); // send request for every 5 seconds
    // }
    loadConversation(); 
    // return () => clearInterval(intervalId); // Clear interval on unmount or when whatsappUserId changes
  }, [whatsappUserId]);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen">
      <ChatList setWhatsappUserId={setWhatsappUserId} />

      <div className="flex flex-col w-full border rounded-lg shadow-lg bg-white">
        {whatsappUserId ? (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              <MessageList messages={messages} />
              <div ref={chatEndRef} />
            </div>
            <MessageInput />
          </>
        ) : (
          <div className="flex justify-center items-center text-xl text-gray-500 h-full">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
