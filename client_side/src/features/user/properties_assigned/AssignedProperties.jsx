import React from 'react'
import { userSpecificProperties } from '../components/userAPI'

const AssignedProperties = () => {
    const fetchProperties = async ()=>{
        const response = await userSpecificProperties();
        console.log("User specific Properties ::>>", response)
    }
    fetchProperties();
  return (
    <div>AssignedProperties</div>
  )
}

export default AssignedProperties