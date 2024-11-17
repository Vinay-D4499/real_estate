import React, { useEffect, useState } from 'react';
import { fetchPropertyDetails } from './propertyAPI';
import toast from 'react-hot-toast';
import PropertyTable from './PropertyDetailsTable';
import PropertyFilters from './PropertyFilters';
import Pagination from './Pagination';
import PropertyContainer from './PropertyContainer';

const InactiveProperties = () => {
    const [properties, setProperties] = useState([]);  // Initialize as an array
    const [filteredProperties, setFilteredProperties] = useState([]);  // Initialize as an array
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('bangalore');  // Correct default location
    const [budgetFilter, setBudgetFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const getPropertiesData = async () => {
            setLoading(true);
            try {
                const response = await fetchPropertyDetails();
                console.log(response, "inactive");

                // Access properties from response
                if (response && response.properties && Array.isArray(response.properties)) {
                    setProperties(response.properties);  // Set properties correctly
                    setFilteredProperties(response.properties);  // Set filteredProperties
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch property details');
                toast.error(error.message || 'Failed to fetch property details');
            } finally {
                setLoading(false);
            }
        };
        getPropertiesData();
    }, [refreshKey]);

    useEffect(() => {
        let filteredData = properties;

        if (searchQuery) {
            filteredData = filteredData.filter((property) =>
                (property.property_name && property.property_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (property.property_address && property.property_address.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (locationFilter) {
            filteredData = filteredData.filter((property) => property.property_address === locationFilter);
        }

        if (budgetFilter) {
            const [minBudget, maxBudget] = budgetFilter.split('-').map(Number);
            filteredData = filteredData.filter(
                (property) =>
                    parseFloat(property.property_price) >= minBudget && parseFloat(property.property_price) <= maxBudget
            );
        }

        setFilteredProperties(filteredData);
        setCurrentPage(1);
    }, [searchQuery, locationFilter, budgetFilter, properties]);

    const indexOfLastProperty = currentPage * recordsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - recordsPerPage;
    const currentProperties = Array.isArray(filteredProperties)
        ? filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
        : [];
    
    const totalPages = Math.ceil(filteredProperties.length / recordsPerPage);

    const refreshPropertyData = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <>
        <div className=" flex flex-col items-center bg-gray-50 py-6">
            <PropertyFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                locationFilter={locationFilter}
                setLocationFilter={setLocationFilter}
                budgetFilter={budgetFilter}
                setBudgetFilter={setBudgetFilter}
                properties={properties}
                setRecordsPerPage={setRecordsPerPage}
                recordsPerPage={recordsPerPage}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <PropertyTable properties={currentProperties} refreshPropertyData={refreshPropertyData} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>

        <div>
        <PropertyContainer />
        </div>
        </>
       
    );
};

export default InactiveProperties;
