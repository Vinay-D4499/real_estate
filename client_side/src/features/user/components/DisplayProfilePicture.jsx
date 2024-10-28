import React, { useEffect, useState } from 'react';
import { getProfilePicture } from './userAPI';

const DisplayProfilePicture = ({ id, height = 'w-24', width = 'h-24' }) => { // Set default height and width
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const blobData = await getProfilePicture(id);
                const url = URL.createObjectURL(blobData); // Create a URL for the blob
                setProfilePictureUrl(url);
            } catch (error) {
                console.error('Failed to fetch profile picture:', error.message);
            }
        };

        fetchProfileImage();

        // Cleanup function to revoke the object URL
        return () => {
            if (profilePictureUrl) {
                URL.revokeObjectURL(profilePictureUrl);
            }
        };
    }, [id]);

    return (
        <div className={`flex items-center justify-center ${width} ${height}`}>
            {profilePictureUrl ? (
                <img
                    src={profilePictureUrl}
                    alt="Profile"
                    className={`rounded-full object-cover border border-gray-300 shadow-md ${width} ${height}`}
                />
            ) : (
                <div className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-500 ${width} ${height}`}>
                    No Image
                </div>
            )}
        </div>
    );
};

export default DisplayProfilePicture;
