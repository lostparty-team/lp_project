'use client';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToastProvider = () => {
  return (
    <ToastContainer
      theme='dark'
      autoClose={1}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      limit={3}
      transition={Flip}
      hideProgressBar
    />
  );
};

export default ToastProvider;
