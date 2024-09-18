import React, { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import Toast from './Toast';
import './ToastContainer.css';

export interface ToastContainerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  variant?: 'minimal' | 'material' | 'modern' | 'progress';
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right', variant = 'modern' }) => {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <div className={`toast-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} id={toast.id!} removeToast={removeToast} variant={variant} position={position} />
      ))}
    </div>
  );
};

export default ToastContainer;