import React from 'react';

const FilterComponent = ({ propertyTypes, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };
  console.log(propertyTypes,"--------propertyType");
  console.log(onFilterChange,"----------------onFilterChange")

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      {/* Property Type Filter */}
      <div className="mb-4">
        <label htmlFor="propertyType" className="block text-gray-700">Property Type</label>
        <select
          id="propertyType"
          name="propertyType"
          onChange={handleFilterChange}
          className="mt-2 block w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          {propertyTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Location Filter */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={handleFilterChange}
          className="mt-2 block w-full p-2 border rounded-md"
          placeholder="Enter location"
        />
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">Max Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={handleFilterChange}
          className="mt-2 block w-full p-2 border rounded-md"
          placeholder="Enter max price"
        />
      </div>
    </div>
  );
};

export default FilterComponent;
