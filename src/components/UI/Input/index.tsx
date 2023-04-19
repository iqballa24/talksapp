import { FormValues } from '@/lib/types';
import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type Props = {
  form: UseControllerProps<FormValues>;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'address' | 'password';
};

const Input: React.FC<Props> = ({ label, form, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { field, fieldState } = useController(form);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <div className="relative flex flex-col space-y-3">
      <label className="font-light " htmlFor="name">
        {label}
      </label>
      <input
        id={label}
        type={type === 'password' ? passwordType : type}
        {...field}
        placeholder={placeholder}
        className="bg-transparent border py-3 px-4 rounded-md placeholder:text-gray-400 placeholder:text-sm placeholder:font-light"
        autoComplete={type === 'password' ? 'on' : 'off'}
      />
      {type === 'password' && (
        <div
          className="absolute top-12 -translate-y-2/4 right-2 p-2 md:p-3 rounded-md cursor-pointer hover:text-cyan "
          onClick={toggleShowPassword}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      )}
      {fieldState.error && (
        <p className="text-red-500 text-xs">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default React.memo(Input);
