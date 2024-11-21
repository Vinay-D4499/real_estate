import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllCustomers } from '../user/components/userAPI';
import UserDetails from '../user/components/UserDetails';
import toast from 'react-hot-toast';
import { assignPropertyDetailsToUser, getPropertyDetailsById } from './propertyAPI';

const AssignPropertyDetailsToUser = () => {
    const { property_id } = useParams();
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [propertyDetails , setPropertyDetails] = useState({});

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetchAllCustomers();
            setCustomers(response);
            setFilteredCustomers(response);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const fetchPropertyDetails = async ()=>{
        try {
            const response = await getPropertyDetailsById(property_id);
            setPropertyDetails(response)
        } catch (error) {
            console.error("Error fetching Property Details ", error)
        }
    }

    useEffect(() => {
        fetchCustomerDetails();
        fetchPropertyDetails();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const lowerQuery = query.toLowerCase();
        const filtered = customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(lowerQuery) ||
                customer.phone.includes(lowerQuery)
        );
        setFilteredCustomers(filtered);
    };

    const handleGroupFilter = (groupId) => {
        setSelectedGroup(groupId);
        if (!groupId) {
            setFilteredCustomers(customers);
        } else {
            const filtered = customers.filter((customer) =>
                customer.Groups.some((group) => group.groupId === parseInt(groupId))
            );
            setFilteredCustomers(filtered);
        }
    };

    const handleSelectAll = () => {
        if (selectedUserIds.length === filteredCustomers.length) {
            setSelectedUserIds([]);
        } else {
            setSelectedUserIds(filteredCustomers.map((customer) => customer.id));
        }
    };

    const handleUserSelection = (userId) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAssignProperty = async (userIds) => {
        try {
            const data = {
                userIds: userIds,
                propertyId: parseInt(property_id),
            };
            await assignPropertyDetailsToUser(data);
            toast.success('Property assigned successfully!');
        } catch (error) {
            console.error('Error assigning property:', error);
            toast.error('Failed to assign property.');
        }
    };

    const uniqueGroups = Array.from(
        new Map(
            customers.flatMap((customer) =>
                customer.Groups.map((group) => [group.groupId, group.groupName])
            )
        )
    );

    return (
        <div className="bg-gray-50 p-6 min-h-screen">
            {propertyDetails ? (
                <>
                </>
            ):(
                <></>
            )}
            <h1 className="mb-6 font-bold text-2xl text-center">Assigning Property to Users</h1>
            <div className="flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0 mb-6">
                {/* Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by name or phone"
                    className="mb-4 md:mb-0 p-2 border rounded-md w-full md:w-1/3"
                />

                {/* Filter by Group */}
                <select
                    value={selectedGroup}
                    onChange={(e) => handleGroupFilter(e.target.value)}
                    className="p-2 border rounded-md w-full md:w-1/4"
                >
                    <option value="">Filter by Group</option>
                    {uniqueGroups.map(([groupId, groupName]) => (
                        <option key={groupId} value={groupId}>
                            {groupName}
                        </option>
                    ))}
                </select>

                {/* Select All Button */}
                <button
                    onClick={handleSelectAll}
                    className="bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                    {selectedUserIds.length === filteredCustomers.length ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.map((customer) => (
                    <div
                        key={customer.id}
                        className={`border-gray-200 bg-white shadow-lg p-4 border rounded-lg ${
                            selectedUserIds.includes(customer.id) ? 'border-blue-500' : ''
                        }`}
                    >
                        {/* Checkbox */}
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={selectedUserIds.includes(customer.id)}
                                onChange={() => handleUserSelection(customer.id)}
                                className="mr-2"
                            />
                            <span className="font-semibold text-gray-800">{customer.name}</span>
                        </div>

                        {/* User Details Card */}
                        <UserDetails userId={customer.id} />

                        {/* Group Details */}
                        {customer.Groups && customer.Groups.length > 0 && (
                            <div className="mt-4">
                                <h2 className="font-semibold text-gray-700 text-lg">Groups</h2>
                                <ul className="space-y-2 mt-2">
                                    {customer.Groups.map((group) => (
                                        <li
                                            key={group.groupId}
                                            className="bg-gray-100 shadow-sm p-3 rounded-lg"
                                        >
                                            <h3 className="font-medium text-gray-800">
                                                {group.groupName}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                <strong>Type:</strong> {group.groupType}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                <strong>Description:</strong> {group.groupDescr}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Individual Assign Property Button */}
                        {selectedUserIds.includes(customer.id) && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => handleAssignProperty([customer.id])}
                                    className="bg-green-500 px-4 py-2 rounded-lg text-white"
                                >
                                    Assign Property to Selected User
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Assign Button for All Selected Users */}
            {selectedUserIds.length > 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => handleAssignProperty(selectedUserIds)}
                        className="bg-green-500 px-6 py-3 rounded-lg text-white"
                    >
                        Assign Property to Selected Users
                    </button>
                </div>
            )}
        </div>
    );
};

export default AssignPropertyDetailsToUser;
