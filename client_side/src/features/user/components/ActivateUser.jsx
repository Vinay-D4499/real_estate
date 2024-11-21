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
                className="bg-green-200 hover:bg-green-700 px-2 py-2 rounded text-white"
            >
                {/* <CheckCircleIcon className="w-6 h-6" /> */}
                <div className="inline-block relative group">
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    <div className="bottom-full left-1/2 absolute bg-black opacity-0 group-hover:opacity-100 mb-2 p-2 rounded-md w-max text-sm text-white transform transition-opacity -translate-x-1/2 duration-300">
                        Activate User
                    </div>
                </div>
            </button>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white shadow-md p-6 rounded-lg w-96">
                        <h2 className="font-semibold text-lg">Confirm Activation</h2>
                        <p className="mt-2">Are you sure you want to activate this user?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 mr-2 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleActivate}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                            >
                                Activate
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* <CustomerReviews /> */}
        </div>
    );
};

export default ActivateUser;
