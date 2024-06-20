import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  className: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  city,
  setCity,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  return (
    <input
      type={type}
      value={city}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
