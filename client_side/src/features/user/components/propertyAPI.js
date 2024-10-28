import axios from "axios";
import { baseURL } from "../../../config/baseURL";

export const getAllPropertyTypes = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred while fetching property types!");
    }
}