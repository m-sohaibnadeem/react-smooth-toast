import React, { createContext, useState, useCallback, ReactNode, FC } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  id?: string;
  type: ToastType;
  message: string;
  icon?: ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}

interface ToastContextProps {
  toasts: ToastOptions[];
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = useCallback((options: ToastOptions) => {
    const id = options.id || Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...options, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
