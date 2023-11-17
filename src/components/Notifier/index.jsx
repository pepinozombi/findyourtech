import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notifier = () => {
  const showToast = (message, type = 'default') => {
    toast(message, { type });
  };

  return (
    <div>
      <ToastContainer />
    </div>
  );
};