import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { activateUserById } from './userAPI';
import { CheckCircleIcon, } from '@heroicons/react/24/solid';
import CustomerReviews from '../../reviews/CustomerReviews';

const ActivateUser = ({ id, refreshCustomerData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleActivate = async () => {
        try {
            await activateUserById(id);
            toast.success("User activated successfully!");
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to activate user:', error.message);
            toast.error("Failed to activate user.");
        }
        refreshCustomerData();
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 py-2 text-white bg-green-200 rounded hover:bg-green-700"
            >
                {/* <CheckCircleIcon className="h-6 w-6" /> */}
                <div className="relative inline-block group">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <div className="absolute left-1/2 bottom-full mb-2 w-max p-2 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2">
                        Activate User
                    </div>
                </div>
            </button>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md w-96 p-6">
                        <h2 className="text-lg font-semibold">Confirm Activation</h2>
                        <p className="mt-2">Are you sure you want to activate this user?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleActivate}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <CustomerReviews />
        </div>
    );
};

export default ActivateUser;
