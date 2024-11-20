import React, { useEffect, useState } from 'react';
import { getUserById } from './userAPI';
import DisplayProfilePicture from './DisplayProfilePicture';

const UserDetails = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    name: 'NA',
    phone: 'NA',
    email: 'NA',
    location: 'NA',
    profile_picture_url: null,
    budget_min: 'NA',
    budget_max: 'NA',
  });

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(userId);
        setUserDetails({
          id: response.id || 'NA',
          name: response.name || 'NA',
          phone: response.phone || 'NA',
          email: response.email || 'NA',
          location: response.location || 'NA',
          profile_picture_url: response.profile_picture_url || null,
          budget_min: response.budget_min ? `₹${response.budget_min}` : 'NA',
          budget_max: response.budget_max ? `₹${response.budget_max}` : 'NA',
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div className="flex items-center space-x-4 p-4 border rounded shadow bg-gray-100 w-full mb-4">
      {/* Profile Picture */}
      <DisplayProfilePicture id={userDetails.id} isEditable={false} />

      {/* User Details */}
      <div className="text-gray-800 text-sm font-medium flex-grow">
        <span className="block text-indigo-700 text-2xl">{userDetails.name}</span>
        <span className="block">{userDetails.phone}</span>
        <span className="block">{userDetails.email}</span>
        <span className="block">{userDetails.location}</span>
        <span className="block">{userDetails.budget_min} - {userDetails.budget_max}</span>
      </div>
    </div>
  );
};

export default UserDetails;
