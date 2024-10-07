import React, { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import Toast from './Toast';
import './ToastContainer.css';
import { ToastContainerProps } from '../types/types';



const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right', variant = 'modern', pauseOnHover = false , groupId, groupCount }) => {
  const { toasts, removeToast } = useContext(ToastContext);
  return (
    <div className={`toast-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} id={toast.id!} removeToast={removeToast} variant={variant} position={position} pauseOnHover={pauseOnHover} groupId={groupId} groupCount={groupCount} />
      ))}
    </div>
  );
};

export default ToastContainer;