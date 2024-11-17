import React from 'react';

const PropertyFilters = ({ searchQuery, setSearchQuery, locationFilter, setLocationFilter, budgetFilter, setBudgetFilter, properties, setRecordsPerPage, recordsPerPage }) => {

    const handleBudgetChange = (e) => {
        setBudgetFilter(e.target.value);
    };

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
                <option value="">Filter by Location</option>
                {/* Assuming locations are part of the property data */}
                <option value="bangalore">bangalore</option>
                <option value="hy">hy</option>
                {properties.map(property => (
                    <option key={property.id} value={property.location}>{property.location}</option>
                ))}
            </select>
            <select
                value={budgetFilter}
                onChange={handleBudgetChange}
                className="border p-2 rounded"
            >
                <option value="">Filter by Budget</option>
                <option value="100000-200000">100k - 200k</option>
                <option value="200000-300000">200k - 300k</option>
                <option value="300000-500000">300k - 500k</option>
            </select>
            <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(e.target.value)}
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
