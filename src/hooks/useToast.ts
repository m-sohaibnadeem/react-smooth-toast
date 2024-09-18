import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import { ToastOptions } from '../types/types';

const useToast = () => {
  const { addToast,removeToast } = useContext(ToastContext);
  const showToast = (options: ToastOptions) => {
    addToast(options);
  };
  const promise = <T>(
    promise: Promise<T>,
    {
      pending,
      success,
      error,
    }: {
      pending: string | ToastOptions;
      success: string | ((result: T) => string | ToastOptions);
      error: string | ((error: any) => string | ToastOptions);
    }
  ) => {
    const id = Math.random().toString(36).slice(2, 11);
    const pendingOptions = typeof pending === 'string' ? { message: pending } : pending;
    addToast({ ...pendingOptions, id, type: 'info', isPending: true });

    promise
      .then((result) => {
        removeToast(id);
        const successOptions = typeof success === 'function' ? success(result) : success;
        const successToast = typeof successOptions === 'string' ? { message: successOptions } : successOptions;
        addToast({ ...successToast, type: 'success' });
      })
      .catch((err) => {
        removeToast(id);
        const errorOptions = typeof error === 'function' ? error(err) : error;
        const errorToast = typeof errorOptions === 'string' ? { message: errorOptions } : errorOptions;
        addToast({ ...errorToast, type: 'error' });
      });

    return promise;
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
    promise
  };
};

export default useToast;