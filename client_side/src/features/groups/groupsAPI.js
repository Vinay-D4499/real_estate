import axios from "axios";
import { baseURL } from "../../config/baseURL";




export const createGroup = async ({groupName, groupType, groupDescr}) => {
    try {
        const responose = await axios.post(`${baseURL}/api/groups/creategroup`,{
            groupName, groupType, groupDescr
        });
        // console.log(responose)
        return responose.data
    } catch (error) {
        console.error("Error while Fetching All Group Details", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}

export const fetchAllGroupDetails = async () => {
    try {
        const responose = await axios.get(`${baseURL}/api/groups/getAllgroups`);
        // console.log(responose)
        return responose.data
    } catch (error) {
        console.error("Error while Fetching All Group Details", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}

export const editGroupDetailsById = async (id) => {
    try {
        const responose = await axios.put(`${baseURL}/api/groups/editGroupById/${id}`);
        // console.log(responose)
        return responose.data;
    } catch (error) {
        console.error("Error while updating the group details :", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
}

export const fetchGroupDetailsById = async (groupId) => {
    try {
        //   console.log("Fetching group details for ID:", groupId);
        const response = await axios.get(`${baseURL}/api/groups/getGroupDetailsById/${groupId}`);
        //   console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while fetching group details:", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const updateGroupDetailsById = async (groupId, groupDetails) => {
    try {
        console.log("Fetching group details for ID:", groupId);
        const response = await axios.put(`${baseURL}/api/groups/editGroupById/${groupId}`, groupDetails);
        //   console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while fetching group details:", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const fetchGroupMembersDetailsAPI = async (groupId) => {
    try {
        console.log("Fetching group members frmom group ID:", groupId);
        const response = await axios.get(`${baseURL}/api/groups/group/${groupId}/users`);
        //   console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while fetching group member details:", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};

export const addUsersToGroup = async (groupId,userId) => {
    try {
        console.log("group ID:", groupId, "user id :", userId);
        const response = await axios.post(`${baseURL}/api/groups/addUserToGroup`,{userId, groupId});
        //   console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error while assigning group :", error);
        throw new Error(error.response?.data?.message || "An error occurred!");
    }
};
