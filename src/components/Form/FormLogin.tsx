import React from 'react';
import { useForm } from 'react-hook-form';
import { Buttons } from '@/components/UI';

import { FormLoginTypes } from '@/lib/types';

const FormLogin: React.FC<{
  submitHandler: (data: FormLoginTypes) => void;
}> = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginTypes>();

  return (
    <form className="flex flex-col space-y-7">
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
                'Password must be 6 or more character and contain at least one letter and one number',
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      <Buttons
        type="submit"
        title="login"
        isPrimary
        onClick={handleSubmit(submitHandler)}
      >
        {isSubmitting ? 'Loading...' : 'Login'}
      </Buttons>
    </form>
  );
};

export default React.memo(FormLogin);
