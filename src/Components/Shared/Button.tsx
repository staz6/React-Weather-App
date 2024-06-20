import React from "react";

interface ButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon }) => (
  <button
    type="button"
    className="bg-white p-2 bg-opacity-40"
    onClick={onClick}
  >
    {icon}
  </button>
);

export default Button;
