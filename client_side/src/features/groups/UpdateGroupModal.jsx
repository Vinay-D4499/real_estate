import React, { useEffect, useState } from 'react';
import { fetchGroupDetailsById, updateGroupDetailsById } from './groupsAPI';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UpdateGroupModal = ({ groupId, onClose, onUpdateSuccess }) => {
  const [groupDetails, setGroupDetails] = useState({
    groupName: '',
    groupType: '',
    groupDescr: '',
  });
  const [loading, setLoading] = useState(false);
  console.log("Group ID in Modal:", groupId);

  useEffect(() => {
    if (!groupId) return;
    const fetchGroupDetails = async () => {
      try {
        const response = await fetchGroupDetailsById(groupId);
        console.log("Fetched Group Details:", response);
        // Ensure group details match expected structure
        setGroupDetails({
          groupName: response.groups?.groupName || '',
          groupType: response.groups?.groupType || '',
          groupDescr: response.groups?.groupDescr || '',
        });
      } catch (error) {
        console.error('Error fetching group details:', error);
        toast.error('Failed to fetch group details.');
      }
    };
  
    fetchGroupDetails();
  }, [groupId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    //   await axios.put(`/api/groups/editGroupById/${groupId}`, groupDetails);
        await updateGroupDetailsById(groupId, groupDetails);
      toast.success('Group details updated successfully!');
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating group details:', error);
      toast.error('Failed to update group details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Update Group Details</h2>
        {groupId ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Group Name</label>
              <input
                type="text"
                name="groupName"
                value={groupDetails.groupName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Group Type</label>
              <input
                type="text"
                name="groupType"
                value={groupDetails.groupType}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="groupDescr"
                value={groupDetails.groupDescr}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Loading group details...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateGroupModal;
