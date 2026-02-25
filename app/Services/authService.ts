import { api } from "./apiClient";
import { API_ENDPOINTS } from "../constants";
import { setItem, removeItem } from "./cookieStorage";
import { LOCAL_STORAGE_KEY } from "../constants";

export const login = async (data: any) => {
  try {
    const response: any = await api.post(API_ENDPOINTS.LOGIN, data);
    if (response?.data?.token) {
      setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (data: any) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_USER);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  removeItem(LOCAL_STORAGE_KEY.USER);
};
