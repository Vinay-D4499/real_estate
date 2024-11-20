import React, { useEffect, useState } from 'react';
import { fetchGroupDetailsById } from './groupsAPI';
import LoadingAnimation from '../../common/LoadingAnimation';
import toast from 'react-hot-toast';

const GroupDetails = ({ groupId }) => {
  const [groupDetails, setGroupDetails] = useState({
    groupName: '',
    groupType: '',
    groupDescr: '',
  });

  useEffect(() => {
    if (!groupId) return;
    const fetchGroupDetails = async () => {
      try {
        const response = await fetchGroupDetailsById(groupId);
        // console.log('Fetched Group Details:', response);
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

  return (
    <div className="bg-blue-500 shadow-md p-4 text-white">
      {groupId ? (
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm md:text-lg">
          <div className="flex items-center">
            <span className="font-semibold">Group Name:</span>
            <span className="ml-2">{groupDetails.groupName}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">Group Type:</span>
            <span className="ml-2">{groupDetails.groupType}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">Description:</span>
            <span className="ml-2">{groupDetails.groupDescr}</span>
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default GroupDetails;
