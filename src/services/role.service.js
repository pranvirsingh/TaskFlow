import { apiClient } from "../api/apiClient";

export const getAllRoles = async () => {
    const response = await apiClient.get("/Roles");
    return response.data;
};

export const getRoleById = async (id) => {
    const response = await apiClient.get(`/Roles/${id}`);
    return response.data;
};

export const addRole = async (data) => {
    const response = await apiClient.post("/Roles", data);
    return response.data;
};

export const updateRole = async (id, data) => {
    const response = await apiClient.put(`/Roles/${id}`, data);
    return response.data;
};

export const deleteRole = async (id) => {
    const response = await apiClient.delete(`/Roles/${id}`);
    return response.data;
};
