import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ErrorIcon, InfoIcon, SpinnerIcon, SuccessIcon, WarningIcon } from '../icons';
import './Toast.css';
import { ToastOptions, ToastPosition, ToastVariant, ToastType } from '../types/types';

interface ToastProps extends ToastOptions {
  removeToast: (id: string) => void;
  variant?: ToastVariant;
  position?: ToastPosition;
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
    if (!id) return;

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
  }, [id, removeToast, duration]);

  const getIcon = useCallback(() => {
    if (icon) return <div className="icon-wrapper">{icon}</div>;
    if (isPending) return <SpinnerIcon />;
    const icons: Record<ToastType, JSX.Element> = {
      success: <SuccessIcon />,
      info: <InfoIcon />,
      error: <ErrorIcon />,
      warning: <WarningIcon />
    };
    return icons[type] || null;
  }, [icon, isPending, type]);

  const getAnimationClass = useCallback(() => {
    if (variant === 'minimal') return 'toast-enter';
    if (position.includes('left')) return 'toast-enter-left';
    if (position.includes('right')) return 'toast-enter-right';
    return 'toast-enter-center';
  }, [variant, position]);

  const baseClassName = useMemo(() => 
    `toast ${type} ${variant} ${getAnimationClass()} ${className || ''}`,
    [type, variant, getAnimationClass, className]
  );

  const renderToast = useCallback((content: React.ReactNode) => (
    <div
      className={`toast ${type} ${variant} ${baseClassName} toast-enter`}
      style={style}
      onClick={() => id && removeToast(id)}
    >
      {content}
      <div 
        className="toast-progress-bar" 
        style={{ 
          width: `${progress}%`,
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          backgroundColor: "green",
          transition: "width 10ms linear",
        }} 
      />
    </div>
  ), [type, variant, baseClassName, style, id, removeToast, progress]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    id && removeToast(id);
  }, [id, removeToast]);

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
        <button className="toast-material-close" onClick={handleClose}>
          &times;
        </button>
      </div>
    );
  }

  if (variant === 'progress') {
    return renderToast(
      <>
        <div className="toast-content">
          {getIcon()}
          <span>{message}</span>
        </div>
        <button className="toast-modern-close" onClick={handleClose}>
          &times;
        </button>
      </>
    );
  }

  if (variant === 'rounded') {
    return (
      <div
        className={`toast-rounded ${type} ${baseClassName}`}
        style={{...style, borderRadius: '25px'}}
        onClick={() => id && removeToast(id)}
      >
        <div className="toast-rounded-content">
          {getIcon()}
          <span>{message}</span>
        </div>
      </div>
    );
  }

  if (variant === 'glassmorphism') {
    return (
      <div
        className={`toast-glassmorphism ${type} ${baseClassName}`}
        style={{
          ...style,
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          borderRadius: '10px',
          padding: '15px',
        }}
        onClick={() => id && removeToast(id)}
      >
        <div className="toast-glassmorphism-content">
          {getIcon()}
          <span>{message}</span>
        </div>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div
        className={`toast-dark ${type} ${baseClassName}`}
        style={{
          ...style,
          background: '#333',
          color: '#fff',
          borderRadius: '5px',
          padding: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => id && removeToast(id)}
      >
        <div className="toast-dark-content">
          {getIcon()}
          <span>{message}</span>
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    const gradientColors = {
      success: 'linear-gradient(135deg, #4CAF50, #45a049)',
      error: 'linear-gradient(135deg, #F44336, #d32f2f)',
      info: 'linear-gradient(135deg, #2196F3, #1976d2)',
      warning: 'linear-gradient(135deg, #FFC107, #ffa000)'
    };

    return (
      <div
        className={`toast-gradient ${type} ${baseClassName}`}
        style={{
          ...style,
          background: gradientColors[type],
          color: '#fff',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
        onClick={() => id && removeToast(id)}
      >
        <div className="toast-gradient-content">
          {getIcon()}
          <span>{message}</span>
        </div>
      </div>
    );
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
  );
};

export default React.memo(Toast);