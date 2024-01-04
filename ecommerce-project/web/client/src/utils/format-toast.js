import { toast } from 'react-toastify';

const styleToast = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const Toastify = (message, success) => {
  success ? toast.success(message, styleToast) : toast.error(message, styleToast);
};
