'use client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const ToastProvider = () => {
  return <ToastContainer theme="dark" autoClose={2000} />
}

export default ToastProvider