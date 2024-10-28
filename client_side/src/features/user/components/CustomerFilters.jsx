import React from 'react';

const CustomerFilters = ({
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    budgetFilter,
    setBudgetFilter,
    customers,
    recordsPerPage,
    setRecordsPerPage
}) => {
    return (
        <div className="w-full max-w-4xl mb-4 flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by Name, Phone or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Filter by Location</option>
                {[...new Set(customers.map((c) => c.location))].map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>
            <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Filter by Budget</option>
                <option value="0-50000">0 - 50,000</option>
                <option value="50000-100000">50,000 - 100,000</option>
                <option value="100000-200000">100,000 - 200,000</option>
            </select>
            <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value={5}>5 Records per page</option>
                <option value={10}>10 Records per page</option>
                <option value={20}>20 Records per page</option>
                <option value={50}>50 Records per page</option>
            </select>
        </div>
    );
};

export default CustomerFilters;
