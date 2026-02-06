import { apiClient } from "../api/apiClient";

export const login = async (data) => {
  try {
    const response = await apiClient.post("/Auth/login", data);
    return response.data;
  } catch (err) {
    return err.response?.data;
  }
};

export const myprofile = async () => {
  try {
    const response = await apiClient.get("/Auth/myProfile");
    return response.data;
  } catch (err) {
    return err.response?.data;
  }
};
