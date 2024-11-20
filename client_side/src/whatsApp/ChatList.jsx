import React, { useEffect, useState } from 'react';
import { fetchAllCustomers } from '../features/user/components/userAPI';
import DisplayProfilePicture from '../features/user/components/DisplayProfilePicture';

const ChatList = ({ setWhatsappUserId }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  // Fetch active users
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const users = await fetchAllCustomers();
        setActiveUsers(users);
      } catch (error) {
        console.error('Failed to fetch active users:', error);
      }
    };

    fetchActiveUsers();
  }, []);

  const handleUserClick = (phone) => {
    setWhatsappUserId(`91${phone}`); 
  };

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{activeUsers.length}</span>
        </div>

        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-96 overflow-y-auto">
          {activeUsers.length > 0 ? (
            activeUsers.map((user) => (
              <button 
                key={user.id} 
                onClick={() => handleUserClick(user.phone)} 
                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              >
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  <DisplayProfilePicture id={user.id} isEditable={false} />
                </div>
                <div className="ml-2 text-sm font-semibold">{user.name}</div>
                {user.unreadMessages > 0 && (
                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                    {user.unreadMessages}
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="text-xs text-gray-500">No active users.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;