import React, { useState } from 'react';
import PropertyTypes from './PropertyTypes';
import PropertyDetails from './PropertyDetails';

const PropertyContainer = () => {
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const handleTypeSelection = (typeId) => {
    console.log(typeId,"----typeId")
    setSelectedTypeId(typeId);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left Section for Property Types */}
      <div >
        <PropertyTypes onSelectType={handleTypeSelection} />
      </div>

      {/* Right Section for Property Details */}
      <div style={{ flex: 2 }}>
        {selectedTypeId ? (
          <PropertyDetails typeId={selectedTypeId} />
        ) : (
          <p>Select a property type to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyContainer;
