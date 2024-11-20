import React from 'react';

const PropertyFilters = ({
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    budgetFilter,
    setBudgetFilter,
    locations,
    budgetRanges,
    setRecordsPerPage,
    recordsPerPage,
}) => {
    return (
        <div className="w-full max-w-4xl mb-4 flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by property name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded"
            />
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>
            <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="">All Budgets</option>
                {budgetRanges.map((range, index) => (
                    <option key={index} value={range.value}>
                        {range.label}
                    </option>
                ))}
            </select>
            <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
                className="border p-2 rounded"
            >
                <option value={5}>5 records per page</option>
                <option value={10}>10 records per page</option>
                <option value={20}>20 records per page</option>
            </select>
        </div>
    );
};

export default PropertyFilters;
