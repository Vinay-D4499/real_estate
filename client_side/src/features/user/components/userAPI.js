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

export const fetchUserDataByPhone = async (phone) => {
    try {
        // console.log('Phone Number in api   : ',phone)
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${baseURL}/api/user/findUserByPhoneNumber`,{phone}, config);
        // console.log("user responose :::>>>>>>>>>>>>", response)
        return response.data;
    } catch (error) {
        console.error(error)
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const fetchAdminData = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}/api/user/getAdminDetails`, config);

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
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}

export const fetchAllInactiveCustomers = async () => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseURL}/api/user/getInactiveCustomerDetails`, config)
        // console.log(response)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}


export const getProfilePicture = async (id) => {
    try {
        const response = await axios.post(`${baseURL}/api/user/getProfilePicture`, { id });
        return response.data.profilePictureUrl;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};
export const getAdminProfilePicture = async (id) => {
    try {
        const response = await axios.post(`${baseURL}/api/user/getAdminProfilePicture`, { id });
        return response.data.profilePictureUrl;
    } catch (error) {
        console.error(error)
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const uploadProfilePicture = async (id, file) => {
    try {
        
        const formData = new FormData();
        formData.append('profilePicture', file);
        // formData.append('id', id);

        const response = await axios.put(`${baseURL}/api/user/updateProfilePicture/${id}`, formData);

        return response.data.profilePictureUrl; 
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Failed to upload image!");
    }
};
export const updateAdminProfilePicture = async (id, file) => {
    try {
        
        const formData = new FormData();
        formData.append('profilePicture', file);
        // formData.append('id', id);

        const response = await axios.put(`${baseURL}/api/user/updateAdminProfilePicture/${id}`, formData);

        return response.data.profilePictureUrl; 
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || "Failed to upload image!");
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
    const response = await axios.get(`${baseURL}/api/user/getUserById/${id}`, config);
    return response.data;
};

export const updateUserById = async (id, userData) => {
    try{
        const token = localStorage.getItem('token');
    // Config for sending the JWT token to the server
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${baseURL}/api/user/updateUserById/${id}`, userData, config);
    return response.data;
    }catch(error){
        console.error(error)
        throw new Error(error.response?.data?.message || "Failed to update user!");
    }
};

export const deleteUserById = async (id) => {
    try {
        // const token = localStorage.getItem('token');
        // // Config for sending the JWT token to the server
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // };
        // console.log(token)
        const response = await axios.put(`${baseURL}/api/user/deleteUserById/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error.response?.data?.message || "Failed to deactivate user!");
    }
};

export const activateUserById = async (id) => {
    try {
        // const token = localStorage.getItem('token');
        // // Config for sending the JWT token to the server
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // };
        // console.log(token)
        const response = await axios.put(`${baseURL}/api/user/activateUserById/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error(error.response?.data?.message || "Failed to deactivate user!");
    }
};

export const userSpecificProperties = async (id) => {
    try {
        const token = localStorage.getItem('token');
        // Config for sending the JWT token to the server
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        // console.log(token)
        const response = await axios.get(`${baseURL}/api/userproperty/getUserPropertyDetailByTokenId`, config);
        return response.data; 
    } catch (error) {
        console.error('Error fetching user specific details :', error);
        throw new Error(error.response?.data?.message || "Failed to fetch user specific properties");
    }
};