import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createGroup } from './groupsAPI'; // Adjust the import based on your file structure

const CreateGroup = ({ onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    groupName: '',
    groupType: '',
    groupDescr: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createGroup(formData);
      toast.success(response.message || 'Group created successfully!');
      setFormData({ groupName: '', groupType: '', groupDescr: '' }); // Reset form

      // Pass the new group data to the parent component
      onCreateSuccess(response.newGroup);
    } catch (error) {
      toast.error(error.message || 'Failed to create the group!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Group Name */}
        <div>
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter group name"
          />
        </div>

        {/* Group Type */}
        <div>
          <label htmlFor="groupType" className="block text-sm font-medium text-gray-700">
            Group Type
          </label>
          <input
            type="text"
            id="groupType"
            name="groupType"
            value={formData.groupType}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter group type"
          />
        </div>

        {/* Group Description */}
        <div>
          <label htmlFor="groupDescr" className="block text-sm font-medium text-gray-700">
            Group Description
          </label>
          <textarea
            id="groupDescr"
            name="groupDescr"
            value={formData.groupDescr}
            onChange={handleChange}
            required
            rows="3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter group description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white rounded-md ${
            isSubmitting
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Group'}
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
