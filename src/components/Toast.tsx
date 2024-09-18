import React, { useEffect, useState } from 'react';
import { ErrorIcon, InfoIcon, SpinnerIcon, SuccessIcon, WarningIcon } from '../icons';
import './Toast.css';
import { ToastOptions } from '../types/types';

interface ToastProps extends ToastOptions {
  removeToast: (id: string) => void;
  variant?: 'minimal' | 'material' | 'modern' | 'progress';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  isPending?: boolean;
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
  variant = 'minimal',
  position = 'top-right',
  isPending = false
}) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    if (id) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.max(0, 100 - (elapsedTime / duration) * 100);
        setProgress(newProgress);
        
        if (newProgress === 0) {
          clearInterval(timer);
          removeToast(id);
        }
      }, 10);

      return () => clearInterval(timer);
    }
  }, [id, removeToast, duration]);

  const getIcon = () => {
    if (icon) return <div className="icon-wrapper">{icon}</div>;
    if (isPending) return <SpinnerIcon />;
    switch (type) {
      case 'success': return <SuccessIcon />;
      case 'info': return <InfoIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
      default: return null;
    }
  };
  const getAnimationClass = () => {
    if (variant === 'minimal') return 'toast-enter';
    if (position.includes('left')) return 'toast-enter-left';
    if (position.includes('right')) return 'toast-enter-right';
    return 'toast-enter-center';
  };

  const baseClassName = `toast ${type} ${variant} ${getAnimationClass()} ${className || ''}`;  
  const renderToast = (content: React.ReactNode) => (
    <div
      className={`toast ${type} ${variant} ${baseClassName} toast-enter`}
      style={style}
      onClick={() => id && removeToast(id)}
    >
      {content}
      <div className="toast-progress-bar" style={{ width: `${progress}%`,position:"absolute",bottom:0,left:0,height:"3px",backgroundColor:"green",transition:"width 10ms linear", }} />
    </div>
  );
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
  if(variant === 'progress'){
    return (
    renderToast(
    <>
      <div className="toast-content">
      {getIcon()}
      <span>{message}</span>
    </div>
           <button className="toast-modern-close" onClick={(e) => { e.stopPropagation(); id && removeToast(id); }}>
           &times;
         </button>
    </>
    )
    )
  }
return (
  <div
  className={`toast ${type} ${variant} ${baseClassName} toast-enter`}
  style={style}
  onClick={() => id && removeToast(id)}
>
  
  <div className="toast-content">
    {getIcon()}
    <span>{message}</span>
  </div>
</div>
)

};

export default Toast;