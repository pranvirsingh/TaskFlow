import { apiClient } from "../api/apiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/Member/GetAll");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/Member/GetById?Id=${id}`);
  return response.data;
};

export const addUser = async (data) => {
  const response = await apiClient.post("/Member/Add", data);
  return response.data;
};

export const updateUser = async (data) => {
  const response = await apiClient.put(`/Member/Update`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/Member/Delete/${id}`);
  return response.data;
};
