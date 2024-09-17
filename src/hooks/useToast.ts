import { useContext } from 'react';
import { ToastContext, ToastOptions } from '../context/ToastContext';

const useToast = () => {
  const { addToast } = useContext(ToastContext);
  const showToast = (options: ToastOptions) => {
    addToast(options);
  };

  return {
    success: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) =>
      showToast({ ...options, type: 'success', message }),
    error: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) =>
      showToast({ ...options, type: 'error', message }),
    info: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) =>
      showToast({ ...options, type: 'info', message }),
    warning: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) =>
      showToast({ ...options, type: 'warning', message }),
  };
};

export default useToast;