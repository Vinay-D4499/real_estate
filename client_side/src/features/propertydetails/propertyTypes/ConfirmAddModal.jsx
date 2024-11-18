import React from 'react';

const ConfirmAddModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 z-50">
            <h2 className="text-lg font-semibold">Confirm Add</h2>
            <p>Are you sure you want to add this property type?</p>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-green-500 text-white rounded px-4 py-2 mr-2"
                    onClick={onConfirm}
                >
                    Yes, Add
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

export default ConfirmAddModal;
