import React, { useEffect, useState } from 'react';
import { fetchAllGroupDetails } from './groupsAPI';
import UpdateGroupModal from './UpdateGroupModal';
import CreateGroupModal from './CreateGroupModal'; // Import the CreateGroupModal
import { Link } from 'react-router-dom';

const AllGroupsDetails = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllGroupDetails();
        setGroups(response.groups || []);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (groupId) => {
    setSelectedGroupId(groupId);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Group Details</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Group
        </button>
      </div>
      {groups.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white text-sm uppercase text-left">
                <th className="p-4">#</th>
                <th className="p-4">Group Name</th>
                <th className="p-4">Group Type</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
                <th className="p-4">Group Members</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr
                  key={group.groupId}
                  className="border-b hover:bg-gray-100 text-sm"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{group.groupName}</td>
                  <td className="p-4">{group.groupType}</td>
                  <td className="p-4">{group.groupDescr}</td>
                  <td className="p-4">
                    <button
                      className="bg-yellow-500 text-white rounded px-3 py-1 flex items-center hover:bg-yellow-600"
                      onClick={() => handleEditClick(group.groupId)}
                    >
                      <span>Edit</span>
                    </button>
                  </td>
                  <td className='text-indigo-600 font-semibold underline '>
                    <Link to={`/group-members/${group.groupId}`} >Group Members</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No groups available.</p>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <UpdateGroupModal
          groupId={selectedGroupId}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateSuccess={() => {
            setIsEditModalOpen(false);
            const fetchData = async () => {
              const response = await fetchAllGroupDetails();
              setGroups(response.groups || []);
            };
            fetchData();
          }}
        />
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateGroupModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreateSuccess={() => {
            setIsCreateModalOpen(false);
            const fetchData = async () => {
              const response = await fetchAllGroupDetails();
              setGroups(response.groups || []);
            };
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default AllGroupsDetails;
