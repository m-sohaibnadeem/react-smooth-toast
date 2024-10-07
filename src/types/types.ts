import { ReactNode, CSSProperties } from 'react';

// Toast Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  id?: string;
  type: ToastType;
  message: string;
  icon?: ReactNode;
  duration?: number;
  style?: CSSProperties;
  className?: string;
  isPending?: boolean;
}

// Toast Component Props
export interface ToastProps extends ToastOptions {
  removeToast: (id: string | undefined) => void;
  variant?: ToastVariant;
  position?: ToastPosition;
}

// Toast Container Props
export interface ToastContainerProps {
  position?: ToastPosition;
  variant?: ToastVariant;
  pauseOnHover?: boolean;
  groupId?: string;
  groupCount?: number;
}

// Toast Context Props
export interface ToastContextProps {
  toasts: ToastOptions[];
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

// Toast Provider Props
export interface ToastProviderProps {
  children: ReactNode;
}

// useToast Hook Types
export interface UseToastReturn {
  success: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => void;
  error: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => void;
  info: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => void;
  warning: (message: string, options?: Omit<ToastOptions, 'type' | 'message'>) => void;
  promise: <T>(
    promise: Promise<T>,
    options: {
      pending: string | ToastOptions;
      success: string | ((result: T) => string | ToastOptions);
      error: string | ((error: any) => string | ToastOptions);
    }
  ) => Promise<T>;
}

// Utility Types
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export type ToastVariant = 'minimal' | 'material' | 'modern' | 'progress' | 'rounded' | 'glassmorphism' | 'dark' | 'gradient' ;

// More types to come
// | 'outlined'
// | 'elevated'
// | 'custom'
// | 'animated'
// | 'compact