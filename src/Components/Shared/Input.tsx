import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ type, placeholder, city, setCity }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  return (
    <input
      type={type}
      onChange={handleChange}
      value={city}
      placeholder={placeholder}
      className="bg-white p-2 w-80 text-xl rounded-md capitalize pl-5 bg-opacity-40"
    />
  );
};

export default Input;
