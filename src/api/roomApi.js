import axiosInstance from './axiosConfig';
import { handleResponse, handleError } from '../utils/handleResponse';

const baseUrl = '/rooms/';

const getToken = () => {
  return sessionStorage.getItem('token');
};

export const getRooms = async () => {
  try {
    const response = await axiosInstance.get(baseUrl, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addRoom = async (data) => {
  try {
    const response = await axiosInstance.post(baseUrl, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateRoom = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};