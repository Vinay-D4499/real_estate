import React, { useState } from "react";
import PropertyTypes from "./PropertyTypes";
import SavePropertyDetailsFrom from "./SavePropertyDetailsFrom";

const SavePropertyDetails = () => {
  const [selectedTypeId, setSelectedTypeId] = useState(null);

  const handleSelectType = (typeId) => {
    setSelectedTypeId(typeId);
  };

  return (
    <>
      <h4 className="justify-center my-3 py-4 text-4xl text-center">
        Select a Property Type to Add Details
      </h4>
      <div className="ml-9">
        <PropertyTypes onSelectType={handleSelectType} />
        {selectedTypeId ? (
          <SavePropertyDetailsFrom propertyTypeId={selectedTypeId} />
        ) : (
          <div className="text-center mt-4 text-red-600">
            Please select a property type to save the details.
          </div>
        )}
      </div>
    </>
  );
};

export default SavePropertyDetails;
