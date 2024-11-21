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
        <div className="flex md:flex-row flex-col gap-4 mb-4 w-full max-w-4xl">
            <input
                type="text"
                placeholder="Search by property name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded"
            />
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-2 border rounded"
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
                className="p-2 border rounded"
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
                className="p-2 border rounded"
            >
                <option value={10}>10 records per page</option>
                <option value={20}>20 records per page</option>
                <option value={30}>30 records per page</option>
            </select>
        </div>
    );
};

export default PropertyFilters;
