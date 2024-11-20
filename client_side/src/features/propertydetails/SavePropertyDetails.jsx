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
    <h4 className="text-4xl text-center">Select a Property type to add details </h4>
    <div className="ml-9">
      <PropertyTypes onSelectType={handleSelectType} />
      {selectedTypeId && (
        <SavePropertyDetailsFrom propertyTypeId={selectedTypeId} />
      )}
    </div>
    </>
  );
};

export default SavePropertyDetails;
