import React, { useEffect, useState } from 'react';
import GroupDetails from './GroupDetails';
import { fetchAllCustomers } from '../user/components/userAPI';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import UserDetails from '../user/components/UserDetails';
import { addUsersToGroup } from './groupsAPI';

const AddMembersToGroup = () => {
  const { groupId } = useParams(); // Extract groupId from URL params
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  // Function to fetch customer details and exclude group members
  const fetchCustomers = async () => {
    try {
      const response = await fetchAllCustomers();
      console.log('Fetched Customer Details:', response);

      // Exclude customers who are already in the group
      const nonGroupCustomers = response.filter((customer) =>
        !customer.Groups.some((group) => group.groupId === parseInt(groupId))
      );

      setCustomers(nonGroupCustomers);
      setFilteredCustomers(nonGroupCustomers); // Initially display non-group customers
    } catch (error) {
      console.error('Error fetching customer details:', error);
      toast.error(error.message || 'Failed to fetch customer details');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [groupId]);

  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCustomers(customers); // Show all customers if search is empty
    } else {
      setFilteredCustomers(
        customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm)
        )
      );
    }
  }, [searchTerm, customers]);

  const handleAddUserToGroup = async (userId) => {
    try {
      const response = await addUsersToGroup(groupId, userId);
      toast.success(response.message || 'User added to group successfully!');
      
      // Refetch customers after adding user
      await fetchCustomers();
    } catch (error) {
      toast.error(error.message || 'Failed to add user to group');
    }
  };

  return (
    <div className="p-4">
      {/* Display Group Details */}
      <GroupDetails groupId={groupId} />

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Display Customers */}
      {filteredCustomers.length > 0 ? (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl p-4 border rounded-lg transition-shadow duration-200"
            >
              {/* Pass customer ID to UserDetails */}
              <UserDetails userId={customer.id} />

              {/* Add Member Button */}
              <button
                onClick={() => handleAddUserToGroup(customer.id)}
                className="bg-blue-500 hover:bg-blue-600 mt-4 px-6 py-2 rounded-md text-white focus:outline-none"
              >
                Add as Member
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-4 text-gray-600">No Members to add</p>
        </div>
      )}
    </div>
  );
};

export default AddMembersToGroup;
