import React from 'react'
import { getPropertyTypeById } from '../propertyAPI'

const PropertyTypeDetails = ({id}) => {
    const fetchPropertyTypeDetails = async ()=>{
        const response = await getPropertyTypeById(id);
        console.log(response)
    }
    fetchPropertyTypeDetails();
  return (
    <div>PropertyTypeDetails</div>
  )
}

export default PropertyTypeDetails