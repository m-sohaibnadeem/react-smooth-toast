import React from 'react';
import "./icons.css";
const iconStyle = {
  display: 'inline-block',
  animation: 'scaleIn 0.3s ease-out 0.1s both',
};

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={iconStyle}>
    {children}
  </div>
);

export const SuccessIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" style={{ color: 'green', width: 20, height: 20,}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
  </IconWrapper>
);

export const InfoIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" style={{ color: '#00BCD4', width: 20, height: 20}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>
  </IconWrapper>
);

export const ErrorIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" style={{ color: 'red', width: 20, height: 20}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
  </IconWrapper>
);

export const WarningIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" style={{ color: 'orange', width: 20, height: 20, marginTop: "2px" }}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
</svg>
  </IconWrapper>
);

export const SpinnerIcon = () => (
  <IconWrapper>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  </IconWrapper>
);