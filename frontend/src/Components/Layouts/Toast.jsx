import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    const notifySuccess = (message) => {
        toast.success(message);
    };
    
    const notifyError = (message) => {
        toast.error(message);
    };

    const notifyInfo = (message) => {
        toast.info(message);
    };

    const notifyWarning = (message) => {
        toast.warn(message);
    };



// Export the notification functions if you want to use them in other components
export { notifySuccess, notifyError, notifyInfo, notifyWarning };

