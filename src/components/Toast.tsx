import React, { useEffect } from 'react';
import { ToastOptions } from '../context/ToastContext';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons';
import './Toast.css';

interface ToastProps extends ToastOptions {
  removeToast: (id: string) => void;
  variant?: 'minimal' | 'material';
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  type, 
  message, 
  icon, 
  duration = 3000, 
  style, 
  className, 
  removeToast,
  variant = 'minimal'
}) => {
  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => removeToast(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, removeToast, duration]);

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
  const baseClassName = `toast-enter ${className || ''}`;

  if (variant === 'material') {
    return (
      <div
        className={`toast-material ${type} ${baseClassName}`}
        style={style}
        onClick={() => id && removeToast(id)}
      >
        <div className="toast-material-content">
          {getIcon()}
          <span>{message}</span>
        </div>
        <button className="toast-material-close" onClick={(e) => { e.stopPropagation(); id && removeToast(id); }}>
          &times;
        </button>
      </div>
    );
  }

  // Default tailwind variant
  return (
    <div
      className={`toast ${type} ${baseClassName} toast-enter`}
      style={style}
      onClick={() => id && removeToast(id)}
    >
      <div className="toast-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;