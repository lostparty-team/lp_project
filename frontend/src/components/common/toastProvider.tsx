'use client';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToastProvider = () => {
  return (
    <ToastContainer
      theme='dark'
      autoClose={100}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      limit={1}
      transition={Flip}
      hideProgressBar
    />
  );
};

export default ToastProvider;
