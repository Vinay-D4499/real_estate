// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { baseURL } from "../../../src/config/baseURL"; 

// const PropertyTypes = ({ onSelectType }) => {
  
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPropertyTypes = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);

//         // Access the 'properties' array from the response data
//         if (response.data && response.data.properties) {
//           setPropertyTypes(response.data.properties);
//         } else {
//           throw new Error('No property types found');
//         }
//       } catch (error) {
//         console.error('Error fetching property types:', error);
//         setError('Failed to load property types. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyTypes();
//   }, []);

//   if (loading) {
//     return <p>Loading property types...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Property Types</h2>
//       {propertyTypes.length === 0 ? (
//         <p>No property types available.</p>
//       ) : (
//         <select onChange={(e) => onSelectType(e.target.value)} defaultValue="">
//           <option value="" disabled>Select a Property Type</option>
//           {propertyTypes.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.name} {/* Display property type name */}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default PropertyTypes;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from "../../../src/config/baseURL";

const PropertyTypes = ({ onSelectType, selectedTypeId }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);
        if (response.data && response.data.properties) {
          setPropertyTypes(response.data.properties);
        } else {
          throw new Error('No property types found');
        }
      } catch (error) {
        console.error('Error fetching property types:', error);
        setError('Failed to load property types. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyTypes();
  }, []);

  if (loading) {
    return <p>Loading property types...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Property Types</h2>
      {propertyTypes.length === 0 ? (
        <p>No property types available.</p>
      ) : (
        <select
          onChange={(e) => onSelectType(e.target.value)}
          defaultValue={selectedTypeId || ""}
        >
          <option value="" disabled>Select a Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PropertyTypes;
