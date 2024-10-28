import React, { useEffect, useState } from 'react';
import { fetchAllCustomers } from './userAPI';
import toast from 'react-hot-toast';
import DisplayProfilePicture from './DisplayProfilePicture';
import CustomerTable from './CustomerTable';
import CustomerFilters from './CustomerFilters';
import Pagination from './Pagination';

const AllCustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [budgetFilter, setBudgetFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5); // Default records per page

    useEffect(() => {
        const getCustomersData = async () => {
            try {
                const response = await fetchAllCustomers();
                setCustomers(response);
                setFilteredCustomers(response);
            } catch (error) {
                toast.error(error.message || 'Failed to fetch customer details');
            }
        };
        getCustomersData();
    }, []);

    // Filter customers 
    useEffect(() => {
        let filteredData = customers;
    
        if (searchQuery) {
            filteredData = filteredData.filter((customer) =>
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone.includes(searchQuery) || 
                (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase())) 
            );
        }
    
        if (locationFilter) {
            filteredData = filteredData.filter((customer) => customer.location === locationFilter);
        }
    
        if (budgetFilter) {
            const [minBudget, maxBudget] = budgetFilter.split('-').map(Number);
            filteredData = filteredData.filter(
                (customer) =>
                    customer.budget_min >= minBudget && customer.budget_max <= maxBudget
            );
        }
    
        setFilteredCustomers(filteredData);
        setCurrentPage(1); // Reset to the first page on filter change
    }, [searchQuery, locationFilter, budgetFilter, customers]);
    

    // For Pagination
    const indexOfLastCustomer = currentPage * recordsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - recordsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <h2 className="text-2xl font-bold text-gray-800 py-4">Customer Details</h2>

            <div className="mb-4 text-gray-600">
                Total Customers: {filteredCustomers.length}
            </div>

            {/* Search and Filters */}
            <CustomerFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                budgetFilter={budgetFilter}
                setBudgetFilter={setBudgetFilter}
                customers={customers}
                recordsPerPage={recordsPerPage}
                setRecordsPerPage={setRecordsPerPage}
            />

            {/* Customer Table */}
            <CustomerTable customers={currentCustomers} />

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default AllCustomerDetails;
