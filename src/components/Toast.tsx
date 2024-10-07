import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { ErrorIcon, InfoIcon, SpinnerIcon, SuccessIcon, WarningIcon } from '../icons';
import './Toast.css';
import { ToastOptions, ToastPosition, ToastVariant, ToastType } from '../types/types';

interface ToastProps extends ToastOptions {
  removeToast: (id: string) => void;
  variant?: ToastVariant;
  position?: ToastPosition;
  isPending?: boolean;
  pauseOnHover?: boolean;
  groupId?: string;
  groupCount?: number;
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
  isPending = false,
  pauseOnHover = false,
  groupId,
  groupCount = 1
}) => {
  const [progress, setProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const startTime = Date.now();
    let elapsedTime = 0;
    const timer = setInterval(() => {
      if (!isPaused) {
        elapsedTime = Date.now() - startTime;
        const newProgress = Math.max(0, 100 - (elapsedTime / duration) * 100);
        setProgress(newProgress);
        
        if (newProgress === 0) {
          clearInterval(timer);
          removeToast(id);
        }
      }
    }, 10);

    return () => clearInterval(timer);
  }, [id, removeToast, duration, isPaused]);

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

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeOffset(touch.clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!toastRef.current) return;
    const touch = e.touches[0];
    const diff = touch.clientX - swipeOffset;
    toastRef.current.style.transform = `translateX(${diff}px)`;
  }, [swipeOffset]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!toastRef.current) return;
    const touch = e.changedTouches[0];
    const diff = touch.clientX - swipeOffset;
    if (Math.abs(diff) > 100) {
      removeToast(id ?? '');
    } else {
      toastRef.current.style.transform = 'translateX(0)';
    }
  }, [id, removeToast, swipeOffset]);

  const renderToast = useCallback((content: React.ReactNode) => (
    <div
      ref={toastRef}
      className={`toast ${type} ${variant} ${baseClassName} toast-enter`}
      style={{...style, transition: 'transform 0.3s ease-out'}}
      onClick={() => id && removeToast(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {content}
      {variant === 'progress' && (
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
      )}
      {groupCount > 1 && (
        <div className="toast-group-count">
          {groupCount}
        </div>
      )}
    </div>
  ), [type, variant, baseClassName, style, id, removeToast, progress, handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd, groupCount]);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    id && removeToast(id);
  }, [id, removeToast]);

  const renderGroupedToast = (content: React.ReactNode) => (
    <div className="toast-group">
      {renderToast(content)}
      {groupCount > 1 && (
        <div className="toast-group-info">
          {groupCount} similar notifications
        </div>
      )}
    </div>
  );

  if (variant === 'material') {
    return renderGroupedToast(
      <div className="toast-material-content">
        {getIcon()}
        <span>{message}</span>
        <button className="toast-material-close" onClick={handleClose}>
          &times;
        </button>
      </div>
    );
  }

  if (variant === 'progress') {
    return renderGroupedToast(
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
    return renderGroupedToast(
      <div className="toast-rounded-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    );
  }

  if (variant === 'glassmorphism') {
    return renderGroupedToast(
      <div className="toast-glassmorphism-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    );
  }

  if (variant === 'dark') {
    return renderGroupedToast(
      <div className="toast-dark-content">
        {getIcon()}
        <span>{message}</span>
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

    return renderGroupedToast(
      <div className="toast-gradient-content" style={{ background: gradientColors[type] }}>
        {getIcon()}
        <span>{message}</span>
      </div>
    );
  }

  return renderGroupedToast(
    <div className="toast-content">
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

export default React.memo(Toast);