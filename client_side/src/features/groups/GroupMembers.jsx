import React, { useEffect, useState } from 'react';
import GroupDetails from './GroupDetails';
import { Link, useParams } from 'react-router-dom';
import LoadingAnimation from '../../common/LoadingAnimation';
import { fetchGroupMembersDetailsAPI } from './groupsAPI';
import toast from 'react-hot-toast';
import UserDetails from '../user/components/UserDetails';

const GroupMembers = () => {
  const { groupId } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroupMembersDetails = async () => {
      try {
        const response = await fetchGroupMembersDetailsAPI(groupId);
        console.log('Fetched Group members Details:', response);
        setGroupMembers(response);
      } catch (error) {
        console.error('Error fetching group members details:', error);
        toast.error('Failed to fetch group members details.');
      }
    };

    fetchGroupMembersDetails();
  }, [groupId]);

  return (
    <>
      <div className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-56 font-semibold text-center text-white text">
        <Link to={`/groups/add-members/${groupId}`} className='text-center'>Add Members</Link>
      </div>
      <div className="p-4">
        {/* Display Group Details */}
        <GroupDetails groupId={groupId} />
        {/* Display Group Members */}
        {groupMembers.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {groupMembers.map((member) => (
              <UserDetails key={member.id} userId={member.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* <LoadingAnimation /> */}
            <p className="mt-4 text-gray-600">No memebers found for this group</p>
            <div className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-56 font-semibold text-center text-white">
              <Link to={`/groups/add-members/${groupId}`} >Add Members</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupMembers;
