import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 z-50">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete this property type?</p>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-red-500 text-white rounded px-4 py-2 mr-2"
                    onClick={onConfirm}
                >
                    Delete
                </button>
                <button
                    className="bg-gray-300 text-gray-800 rounded px-4 py-2"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmDeleteModal;
