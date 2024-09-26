export const handleResponse = (response) => {
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'An error occurred',
      };
    }
  };
  
  export const handleError = (error) => {
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
    };
  };