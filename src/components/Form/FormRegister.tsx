import React from 'react';
import { useForm } from 'react-hook-form';
import { Buttons } from '@/components/UI';

import { FormRegisterTypes, registerTypes } from '@/lib/types';

const FormRegister: React.FC<{
  submitHandler: (data: registerTypes) => void;
}> = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormRegisterTypes>();

  return (
    <form className="flex flex-col space-y-7">
      <div className="flex flex-col space-y-3">
        <label className="font-light" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Your username"
          className="bg-transparent border py-2 px-3 rounded"
          {...register('username', {
            required: 'Username field is required',
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-3">
        <label className="font-light" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="text"
          placeholder="Your email address"
          className="bg-transparent border py-2 px-3 rounded"
          {...register('email', {
            required: 'Email field is required',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Email must be a valid email',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-3">
        <label className="font-light" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          className="bg-transparent border py-2 px-3 rounded"
          {...register('password', {
            required: 'Password field is required',
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*?&]{6,}$/g,
              message:
                'Password must be 5 or more character and contain at least one letter and one number',
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-3">
        <label className="font-light" htmlFor="confirmPassword">
          Confirmation Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Your confirmation password"
          className="bg-transparent border py-2 px-3 rounded"
          {...register('confirmPassword', {
            validate: (value) =>
              value === getValues('password') || 'The password do not match',
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Buttons
        type="submit"
        title="register"
        isPrimary
        onClick={handleSubmit(submitHandler)}
      >
        {isSubmitting ? 'Loading...' : 'Register'}
      </Buttons>
    </form>
  );
};

export default React.memo(FormRegister);
