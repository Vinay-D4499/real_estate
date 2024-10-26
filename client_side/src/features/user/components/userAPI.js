import axios from 'axios';
import { baseURL } from '../../../config/baseURL';

export const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        
        const response = await axios.get(`${baseURL}/api/user/findUserById`, config);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};
