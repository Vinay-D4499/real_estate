import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import { fetchAllCustomers } from './userAPI'; // Assuming you have a method to fetch all users

const UserListWithSearch = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchAllCustomers();
        setUsers(response);
        setFilteredUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      )
    );
  }, [searchTerm, users]);

  return (
    <div className="w-full">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* User Details Cards */}
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <UserDetails key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  );
};

export default UserListWithSearch;
