import axiosInstance from './axiosConfig';
import { handleResponse, handleError } from '../utils/handleResponse';

const baseUrl = '/lecturers/';

const getToken = () => {
  return sessionStorage.getItem('token');
};

export const getLecturers = async () => {
  try {
    const response = await axiosInstance.get(baseUrl, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const addLecturer = async (data) => {
  try {
    const response = await axiosInstance.post(baseUrl, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const updateLecturer = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteLecturer = async (id) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};