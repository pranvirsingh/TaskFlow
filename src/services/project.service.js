import { apiClient } from "../api/apiClient";

export const getAllProjects = async () => {
    const response = await apiClient.get("/Project/GetAll");
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await apiClient.get(`/Project/GetById?Id=${id}`);
    return response.data;
};

export const addProject = async (data) => {
    const response = await apiClient.post("/Project/Add", data);
    return response.data;
};

export const updateProject = async (data) => {
    const response = await apiClient.put(`/Project/Update`, data);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await apiClient.delete(`/Project/Delete/${id}`);
    return response.data;
};
