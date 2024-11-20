import React from 'react';

const AddPropertyModal = ({ propertyType, setPropertyType, onSubmit, onCancel }) => {
    const handleInputChange = (e) => {
        setPropertyType(e.target.value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 z-50">
                <h2 className="text-lg font-semibold mb-4">Add Property Type</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full p-2"
                            value={propertyType}
                            onChange={handleInputChange}
                            placeholder="Enter property type"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-800 rounded px-4 py-2"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyModal;
