import React from "react";

interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, className }) => (
  <button type="button" className={className} onClick={onClick}>
    {icon}
  </button>
);

export default Button;
