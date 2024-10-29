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
    // Standardized budget ranges
    const budgetRanges = [
        { label: '< ₹1 Lakh', value: '0-100000' },
        { label: '₹1-5 Lakhs', value: '100000-500000' },
        { label: '₹5-10 Lakhs', value: '500000-1000000' },
        { label: '₹10-20 Lakhs', value: '1000000-2000000' },
        { label: '₹20-50 Lakhs', value: '2000000-5000000' },
        { label: '₹50 Lakhs - ₹1 Crore', value: '5000000-10000000' },
        { label: '> ₹1 Crore', value: '10000000-Infinity' },
    ];

    return (
        <div className="w-full max-w-4xl mb-4 flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by Name, Phone or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Location Filter */}
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

            {/* Budget Filter */}
            <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Filter by Budget</option>
                {budgetRanges.map((range, index) => (
                    <option key={index} value={range.value}>
                        {range.label}
                    </option>
                ))}
            </select>

            {/* Records Per Page */}
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
