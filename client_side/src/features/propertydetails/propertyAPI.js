import axios from 'axios';
import { baseURL } from '../../../src/config/baseURL';


// Fetch property details based on a filter (you can modify filters like location, budget, etc.)
export const fetchPropertyDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}/api/propertydetails/properties`, config);
        // console.log(response.data,"------------response.data");
        return response.data; // assuming the response contains an array of property details
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch property details");
    }
};
