import { useState } from 'react';
import { notifySuccess, notifyError } from '../components/notifications/CustomToast';

const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(...args);
      if (response.success) {
        notifySuccess(response.message);
      } else {
        notifyError(response.message);
      }
      return response;
    } catch (err) {
      notifyError('An error occurred');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};

export default useApi;