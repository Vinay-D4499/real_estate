import axios from 'axios';
import { baseURL } from '../../config/baseURL';

const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

export const signInUser = async (email, password) => {
    try {
        const response = await axios.post(`${baseURL}/api/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const passwordResetEmail = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/api/auth/sendPasswordResetEmail`, { email });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await axios.post(
            `${baseURL}/api/auth/updatePassword`,
            { oldPassword, newPassword }, 
            config
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};
