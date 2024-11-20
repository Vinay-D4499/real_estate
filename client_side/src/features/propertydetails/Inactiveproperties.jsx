import React, { useEffect, useState } from 'react';
import { fetchPropertyDetails } from './propertyAPI';
import toast from 'react-hot-toast';
import PropertyTable from './PropertyDetailsTable';
import PropertyFilters from './PropertyFilters';
import Pagination from './Pagination';
import PropertyContainer from './PropertyContainer';

const InactiveProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [locations, setLocations] = useState([]);
    const [budgetRanges, setBudgetRanges] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [budgetFilter, setBudgetFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPropertiesData = async () => {
            setLoading(true);
            try {
                const response = await fetchPropertyDetails();
                if (response && response.properties && Array.isArray(response.properties)) {
                    setProperties(response.properties);
                    setFilteredProperties(response.properties);

                    // Extract unique locations
                    const uniqueLocations = [
                        ...new Set(response.properties.map((property) => property.property_address)),
                    ];
                    setLocations(uniqueLocations);

                    // Determine dynamic budget ranges
                    const prices = response.properties.map((property) => parseFloat(property.property_price));
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const step = Math.ceil((maxPrice - minPrice) / 3);
                    const ranges = [
                        { label: `${minPrice} - ${minPrice + step}`, value: `${minPrice}-${minPrice + step}` },
                        { label: `${minPrice + step + 1} - ${minPrice + 2 * step}`, value: `${minPrice + step + 1}-${minPrice + 2 * step}` },
                        { label: `${minPrice + 2 * step + 1} - ${maxPrice}`, value: `${minPrice + 2 * step + 1}-${maxPrice}` },
                    ];
                    setBudgetRanges(ranges);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                toast.error(error.message || 'Failed to fetch property details');
            } finally {
                setLoading(false);
            }
        };

        getPropertiesData();
    }, []);

    useEffect(() => {
        const filteredData = properties.filter((property) => {
            let matchesSearch = true;
            if (searchQuery) {
                matchesSearch =
                    (property.property_name &&
                        property.property_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (property.property_address &&
                        property.property_address.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            let matchesLocation = true;
            if (locationFilter) {
                matchesLocation = property.property_address === locationFilter;
            }

            let matchesBudget = true;
            if (budgetFilter) {
                const [minBudget, maxBudget] = budgetFilter.split('-').map(Number);
                matchesBudget =
                    parseFloat(property.property_price) >= minBudget &&
                    parseFloat(property.property_price) <= maxBudget;
            }

            return matchesSearch && matchesLocation && matchesBudget;
        });

        setFilteredProperties(filteredData);
    }, [searchQuery, locationFilter, budgetFilter, properties]);

    const indexOfLastProperty = currentPage * recordsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - recordsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(filteredProperties.length / recordsPerPage);

    return (
        <div className="flex flex-col items-center bg-gray-50 py-6">
            <PropertyFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                budgetFilter={budgetFilter}
                setBudgetFilter={setBudgetFilter}
                locations={locations}
                budgetRanges={budgetRanges}
                setRecordsPerPage={setRecordsPerPage}
                recordsPerPage={recordsPerPage}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PropertyTable properties={currentProperties} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>
    );
};

export default InactiveProperties;
