import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getWhatsAppConversation } from './WhatsAppMessageAPI';
import ChatList from './ChatList';
import { fetchUserDataByPhone } from '../features/user/components/userAPI';

const ChatContainer = () => {
  const [whatsappUserId, setWhatsappUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadConversation = async () => {
      if (!whatsappUserId) return;
      setLoadingMessages(true);
      try {
        const data = await getWhatsAppConversation(whatsappUserId);
        setMessages(data || []);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadConversation();
  }, [whatsappUserId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!whatsappUserId) return;
      setLoadingMessages(true);
      try {
        // console.log("user id :::>>>>", whatsappUserId)
        // Remove the '91' prefix if it exists
        const phoneWithoutPrefix = whatsappUserId.startsWith('91') ? whatsappUserId.slice(2) : whatsappUserId;
        const data = await fetchUserDataByPhone(phoneWithoutPrefix);
        // console.log("selected User data :::>>>", data)
        
          setUser(data);
        
      } catch (error) {
        console.error("Failed to fetch User Data:", error);
      } finally {
        setLoadingMessages(false);
      }
    };
  
    fetchUserData();
  }, [whatsappUserId]);
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSelect = (userId) => {
    setWhatsappUserId(userId);
    setIsChatListVisible(false);
  };

  const handleBackToChatList = () => {
    setIsChatListVisible(true);
    setWhatsappUserId(null);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`lg:block ${isChatListVisible ? 'block' : 'hidden'} w-full lg:w-1/4 h-full border-r overflow-y-auto`}
      >
        <ChatList setWhatsappUserId={handleChatSelect} />
      </div>

      <div className={`flex flex-col w-full lg:w-3/4 ${isChatListVisible && 'hidden lg:flex'} h-full bg-white`}>
        <div className="lg:hidden p-2">
          <button onClick={handleBackToChatList} className="text-blue-500 font-semibold mb-2">
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
                  <MessageList messages={messages} user={user} />
                  <div ref={chatEndRef} />
                </>
              )}
            </div>
            <MessageInput phoneNumber={whatsappUserId} />
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
