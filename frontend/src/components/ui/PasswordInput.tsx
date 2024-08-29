import React, { useState } from "react";
import { Input } from "./input";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  value: string;
  onChange: (...event: any[]) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={passwordVisible ? "text" : "password"}
        className="border-0 p-2 w-full"
        placeholder="*******"
        value={value}
        onChange={onChange}
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? <FiEyeOff /> : <FiEye />}
      </div>
    </div>
  );
};

export default PasswordInput;
