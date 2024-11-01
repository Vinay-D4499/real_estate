import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteUserById } from './userAPI'; 
import { TrashIcon } from '@heroicons/react/24/solid';
// import { Modal } from 'react-modal'; 

const DeactivateUser = ({ id, refreshCustomerData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeactivate = async () => {
        try {
            await deleteUserById(id); 
            toast.success("User deactivated successfully!");
            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Failed to deactivate user:', error.message);
            toast.error("Failed to deactivate user.");
        }
        refreshCustomerData();
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className=" px-2 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
                <TrashIcon className='h-6 w-6'/>
            </button>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md w-96 p-6">
                        <h2 className="text-lg font-semibold">Confirm Delete</h2>
                        <p className="mt-2">Are you sure you want to delete this user? This action cannot be undone.</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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

export default DeactivateUser;
