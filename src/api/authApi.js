import axiosInstance from './axiosConfig';
import { handleResponse, handleError } from '../utils/handleResponse';

const baseUrl = '/auth/';

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}login`, { email, password });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post(`${baseUrl}logout`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (data) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}register`, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};