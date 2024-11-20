import React from 'react';
import CreateGroup from './CreateGroup';

const CreateGroupModal = ({ onClose, onCreateSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl p-6 relative mx-4">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Create Group Form */}
        <CreateGroup
          onCreateSuccess={(newGroup) => {
            onCreateSuccess(newGroup); // Pass new group data to parent
          }}
        />
      </div>
    </div>
  );
};

export default CreateGroupModal;
