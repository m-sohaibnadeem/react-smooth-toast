import React, { useEffect } from 'react';
import { ToastOptions } from '../context/ToastContext';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons';
import './Toast.css';

interface ToastProps extends ToastOptions {
  removeToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, icon, duration = 3000, style, className, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (id) removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, removeToast, duration]);

  const handleClick = () => {
    if (id) removeToast(id);
  };

  const getIcon = () => {
    if (icon) return <div className="icon-wrapper">{icon}</div>;
    switch (type) {
      case 'success': return <SuccessIcon />;
      case 'info': return <InfoIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      default: return null;
    }
  };

  return (
    <div
      className={`toast ${type} ${className || ''} toast-enter`}
      style={style}
      onClick={handleClick}
    >
      <div className="toast-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;