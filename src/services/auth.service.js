import { apiClient } from "../api/apiClient";

export const login = async (data) => {
  const response = await apiClient.post("/Auth/login", data);
  return response.data;
};

export const myprofile = async () => {
  const response = await apiClient.get("/Auth/myProfile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await apiClient.put("/Auth/updateProfile", data);
  return response.data;
};