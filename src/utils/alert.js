import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const baseConfig = {
  customClass: {
    popup: 'font-sans rounded-2xl',
    confirmButton: 'bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg outline-none mx-2 transition-colors',
    cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg outline-none mx-2 transition-colors',
  },
  buttonsStyling: false,
};

export const Alert = {
  success: (title, text) => {
    return MySwal.fire({
      ...baseConfig,
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: 'OK',
    });
  },

  confirm: async (title, text, confirmText = 'Yes, do it!') => {
    const result = await MySwal.fire({
      ...baseConfig,
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });
    return result.isConfirmed;
  }
};