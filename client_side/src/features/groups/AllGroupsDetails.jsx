import React, { useEffect, useState } from 'react';
import { fetchAllGroupDetails } from './groupsAPI';
import UpdateGroupModal from './UpdateGroupModal';
import CreateGroupModal from './CreateGroupModal'; // Import the CreateGroupModal
import { Link } from 'react-router-dom';

const AllGroupsDetails = () => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllGroupDetails();
        setGroups(response.groups || []);
        setFilteredGroups(response.groups || []);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter groups based on search term
    const filtered = groups.filter((group) => {
      return (
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.groupType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredGroups(filtered);
  }, [searchTerm, groups]);

  const handleEditClick = (groupId) => {
    setSelectedGroupId(groupId);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 font-bold text-2xl text-center">Group Details</h1>

      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by group name or type"
          className="px-4 py-2 border rounded-lg w-1/3"
        />
        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Group
        </button>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="bg-white shadow-md rounded-lg min-w-full overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-left text-sm text-white uppercase">
                <th className="p-4">#</th>
                <th className="p-4">Group Name</th>
                <th className="p-4">Group Type</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
                <th className="p-4">Group Members</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group, index) => (
                <tr
                  key={group.groupId}
                  className="hover:bg-gray-100 border-b text-sm"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{group.groupName}</td>
                  <td className="p-4">{group.groupType}</td>
                  <td className="p-4">{group.groupDescr}</td>
                  <td className="p-4">
                    <button
                      className="flex items-center bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                      onClick={() => handleEditClick(group.groupId)}
                    >
                      <span>Edit</span>
                    </button>
                  </td>
                  <td className="font-semibold text-indigo-600 underline">
                    <Link to={`/group-members/${group.groupId}`}>
                      Group Members
                    </Link>
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
