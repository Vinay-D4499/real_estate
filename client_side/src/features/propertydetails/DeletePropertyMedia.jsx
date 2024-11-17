import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import Toastify
import { baseURL } from "../../../src/config/baseURL"; 

const DeletePropertyMedia = ({ mediaId, onDeleteSuccess }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/api/propertyMedia/propertymedia/${mediaId}`);
      if (response.status === 200) {
        onDeleteSuccess(mediaId); // Notify parent component
        toast.success('Media deleted successfully!'); // Success toast
      } else {
        toast.error('Failed to delete media.');
      }
    } catch (error) {
      console.error('Error deleting property media:', error);
      toast.error('Failed to delete media. Please try again.'); // Error toast
    } finally {
      setShowConfirmation(false); // Close confirmation modal
    }
  };

  return (
    <div className="relative">
      {/* Three dots button */}
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        &#x22EE; {/* Unicode for vertical ellipsis */}
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-0 bg-white border rounded shadow-md z-10">
          <button
            className="block px-4 py-2 text-left text-red-500 hover:bg-red-100"
            onClick={() => {
              setShowMenu(false);
              setShowConfirmation(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this media?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePropertyMedia;
