import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { format } from 'date-fns';
import { FiSearch, FiArrowDown } from 'react-icons/fi';

const MessageList = ({ messages, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 100);
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), 'yyyy-MM-dd');
    if (!groups[date]) groups[date] = [];
    groups[date].push(message);
    return groups;
  }, {});

  // Modify the filtering condition to exclude images
  const filteredMessages = Object.keys(groupedMessages).reduce((filtered, date) => {
    const matchingMessages = groupedMessages[date].filter((message) => 
      searchTerm 
        ? message.messageBody?.toLowerCase().includes(searchTerm.toLowerCase()) // Only include text messages
        : true // Include all messages if search is empty
    );
    if (matchingMessages.length) {
      filtered[date] = matchingMessages;
    }
    return filtered;
  }, {});

  return (
    <div ref={chatContainerRef} onScroll={handleScroll} className="relative h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center p-2 bg-white shadow-md sticky top-0 z-20">
        <img
          src={user?.profile_picture_url || 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'}
          alt={`${user?.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{user?.name || 'User'}</span>
          <span className="text-gray-500 text-sm">{user?.phone}</span>
        </div>
        <div className="ml-auto cursor-pointer" onClick={() => setIsSearchOpen((prev) => !prev)} title="Search messages">
          <FiSearch className="text-gray-600 text-2xl hover:text-blue-500 transition-colors duration-300" />
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed top-14 right-4 w-72 p-2 bg-white rounded-lg shadow-lg border border-gray-300 z-20 transition-transform duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <div className="pt-16">
        {Object.keys(filteredMessages).length ? (
          Object.keys(filteredMessages).map((date) => (
            <div key={date}>
              <div className="text-center text-gray-500 my-4 text-sm">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </div>
              {filteredMessages[date].map((message, index) => (
                <MessageItem key={index} message={message} />
              ))}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-lg text-gray-500 h-full p-4">
            No conversation available.
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-16 right-6 p-2 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 z-20"
          title="Go to bottom"
        >
          <FiArrowDown className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default MessageList;
