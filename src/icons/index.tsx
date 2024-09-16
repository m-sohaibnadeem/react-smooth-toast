import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
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
    <FaCheckCircle style={{ color: 'green', width: 20, height: 20, marginTop: "5px" }} />
  </IconWrapper>
);

export const InfoIcon = () => (
  <IconWrapper>
    <IoMdInformationCircle style={{ color: '#00BCD4', width: 20, height: 20, marginTop: "5px" }} />
  </IconWrapper>
);

export const ErrorIcon = () => (
  <IconWrapper>
    <FiAlertCircle style={{ color: 'red', width: 20, height: 20, marginTop: "5px" }} />
  </IconWrapper>
);

export const WarningIcon = () => (
  <IconWrapper>
    <IoIosWarning style={{ color: '#FFC107', width: 20, height: 20, marginTop: "5px" }} />
  </IconWrapper>
);