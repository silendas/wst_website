import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (message) => {
  toast.success(
    <div>
      {message}
    </div>
  );
};

const notifyError = (message) => {
  toast.error(
    <div>
      {message}
    </div>
  );
};

const CustomToast = () => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export { CustomToast, notifySuccess, notifyError };