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

export const createUser = async (userData) => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${baseURL}/api/user/createUser`, userData, config)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}

export const fetchAllCustomers = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };  

        const response = await axios.get(`${baseURL}/api/user/getAllCustomerDetails`, config)
        // console.log(response)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}


export const getProfilePicture = async (id) => {
    try {
        const response = await axios.post(`${baseURL}/api/user/getProfilePicture`, { id }, {
            responseType: 'blob', 
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const getUserById = async (id) => {
    const token = localStorage.getItem('token');
    // Config for sending the JWT token to the server
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };  
    const response = await axios.get(`${baseURL}/api/user/getUserById/${id}`,config);
    return response.data; 
};

export const updateUserById = async (id, userData) => {
    const token = localStorage.getItem('token');
    // Config for sending the JWT token to the server
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };  
    const response = await axios.put(`${baseURL}/api/user/updateUserById/${id}`, userData,config);
    return response.data;
};
