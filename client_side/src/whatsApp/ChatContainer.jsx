import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getWhatsAppConversation } from './WhatsAppMessageAPI';
import ChatList from './ChatList';

const ChatContainer = () => {
  const [whatsappUserId, setWhatsappUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isChatListVisible, setIsChatListVisible] = useState(true); // Toggle visibility for small screens
  const [loadingMessages, setLoadingMessages] = useState(false); // For handling message loading
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadConversation = async () => {
      if (!whatsappUserId) return;
      setLoadingMessages(true);
      try {
        const data = await getWhatsAppConversation(whatsappUserId);
        if (data.length === 0) {
          setMessages([]);
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadConversation();
  }, [whatsappUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSelect = (userId) => {
    setWhatsappUserId(userId);
    setIsChatListVisible(false); // Hide chat list on small screens
  };

  const handleBackToChatList = () => {
    setIsChatListVisible(true); // Show chat list on small screens
    setWhatsappUserId(null); // Optional: Deselect user if desired
  };

  return (
    <div className="flex h-screen">
      {/* Chat List Sidebar */}
      <div
        className={`lg:block ${isChatListVisible ? 'block' : 'hidden'} w-full lg:w-1/4 h-full border-r overflow-y-auto`}
      >
        <ChatList setWhatsappUserId={handleChatSelect} />
      </div>

      {/* Conversation View */}
      <div className={`flex flex-col w-full lg:w-3/4 ${isChatListVisible && 'hidden lg:flex'} h-full bg-white`}>
        {/* Back Button for Small Screens */}
        <div className="lg:hidden p-2">
          <button
            onClick={handleBackToChatList}
            className="text-blue-500 font-semibold mb-2"
          >
            &larr; Back to Chats
          </button>
        </div>

        {whatsappUserId ? (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.length === 0 && !loadingMessages ? (
                <div className="flex justify-center items-center text-lg text-gray-500 h-full p-4">
                  No conversation available.
                </div>
              ) : (
                <>
                  <MessageList messages={messages} />
                  <div ref={chatEndRef} />
                </>
              )}
            </div>
            <MessageInput />
          </>
        ) : (
          <div className="flex justify-center items-center text-lg text-gray-500 h-full p-4">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
