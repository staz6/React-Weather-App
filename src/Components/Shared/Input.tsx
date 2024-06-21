import React from "react";

interface InputProps<T> {
  type: string;
  placeholder: string;
  value: T;
  onChange: (value: T) => void;
  className: string;
}

const Input = <T extends string | number | readonly string[] | undefined>({
  type,
  placeholder,
  value,
  onChange,
  className,
}: InputProps<T>): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value as T);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
