import toast from 'react-hot-toast';

const defaultOptions = {
  style: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 500,
  },
};

export const Toast = {
  success: (message) => toast.success(message, defaultOptions),
  error: (message) => toast.error(message, defaultOptions),
  loading: (message) => toast.loading(message, defaultOptions),
  dismiss: (toastId) => toast.dismiss(toastId),
};