import React, { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import Toast from './Toast';
import './ToastContainer.css';

export interface ToastContainerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'minimal' | 'material';

}

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right', variant = 'minimal' }) => {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <div className={`toast-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} removeToast={removeToast} variant={variant} />
      ))}
    </div>
  );
};

export default ToastContainer;