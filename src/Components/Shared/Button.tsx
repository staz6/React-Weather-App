/* eslint-disable react/require-default-props */
import React from "react";

export interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
  description?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  className = "",
  description = "",
}) => (
  <button type="button" className={className} onClick={onClick}>
    {description && <span className="ml-2">{description}</span>} {icon}
  </button>
);

export default Button;
