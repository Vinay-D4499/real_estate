import React, { useState, useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { format } from 'date-fns';
import { FiSearch, FiArrowDown } from 'react-icons/fi';

const MessageList = ({ messages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show "scroll to bottom" button only when user scrolls up
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollToBottom(scrollTop + clientHeight < scrollHeight - 100);
    }
  };

  // Scroll to the bottom on button click
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

  // Filter messages based on search term
  const filteredMessages = Object.keys(groupedMessages).reduce((filtered, date) => {
    const matchingMessages = groupedMessages[date].filter((message) =>
      message.messageBody?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingMessages.length) {
      filtered[date] = matchingMessages;
    }
    return filtered;
  }, {});

  return (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="relative h-full overflow-y-auto custom-scrollbar"
    >
      {/* Search Icon and Tooltip */}
      <div className="fixed top-4 right-6 z-10">
        <div
          className="relative cursor-pointer"
          onClick={() => setIsSearchOpen((prev) => !prev)}
          title="Search messages"
        >
          <FiSearch className="text-gray-600 text-2xl hover:text-blue-500 transition-colors duration-300" />
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Spacer for Fixed Search Bar */}
      <div className="pt-16">
        {/* Display Messages Date-wise */}
        {Object.keys(filteredMessages).length ? (
          Object.keys(filteredMessages).map((date) => (
            <div key={date}>
              {/* Date header */}
              <div className="text-center text-gray-500 my-4 text-sm">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </div>
              {filteredMessages[date].map((message, index) => (
                <MessageItem key={index} message={message} />
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No messages found.</p>
        )}

        {/* Reference to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 z-20"
          title="Go to bottom"
        >
          <FiArrowDown className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default MessageList;
