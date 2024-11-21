import React, { useEffect, useState } from 'react';
import { getAdminProfilePicture,  uploadProfilePicture } from './userAPI';
import { toast } from 'react-hot-toast';
import { PencilIcon } from '@heroicons/react/24/solid';

const AdminProfilePicture = ({ id, height = 'w-10', width = 'h-10', isEditable = false }) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const url = await getAdminProfilePicture(id);
                setProfilePictureUrl(url);
            } catch (error) {
                console.error('Failed to fetch profile picture:', error.message);
            }
        };  

        fetchProfileImage();
    }, [id]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const url = await uploadProfilePicture(id, file);
                setProfilePictureUrl(url);  
                toast.success("Profile picture updated successfully!");
            } catch (error) {
                console.error('Failed to upload profile picture:', error.message);
                toast.error("Failed to update profile picture.");
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            <div className={`relative ${width} ${height} mb-4 group`}>
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

                {/* Floating image on hover */}
                {/* {profilePictureUrl && (
                    <div className="group-hover:flex top-0 left-0 z-50 absolute justify-center items-center border-gray-300 hidden bg-white shadow-lg border rounded-full w-48 lg:w-56 h-48 lg:h-56 overflow-hidden">
                        <img
                            src={profilePictureUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )} */}
            </div>

            {isEditable && (
                <label htmlFor={`upload-input-${id}`} className="-right-2 -bottom-2 absolute">
                    <PencilIcon className="border-gray-300 bg-white shadow-md p-1 border rounded-full w-6 sm:w-6 h-6 sm:h-6 text-gray-600 transition-transform duration-200 cursor-pointer hover:scale-105" />
                    <input
                        id={`upload-input-${id}`} 
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
};

export default AdminProfilePicture;
