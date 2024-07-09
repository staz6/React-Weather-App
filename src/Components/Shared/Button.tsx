import React from "react";

export interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode | null;
  className: string;
  description: string;
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  className = "",
  description = "",
  children = null,
}) => (
  <button type="button" className={className} onClick={onClick}>
    {description && <span className="ml-2">{description}</span>} {icon}
    {children}
  </button>
);

export default Button;
