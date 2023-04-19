import React from 'react';
import { useForm } from 'react-hook-form';
import { Buttons, Input } from '@/components/UI';

import { registerTypes, FormValues } from '@/lib/types';

const FormRegister: React.FC<{
  submitHandler: (data: registerTypes) => void;
}> = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form className="flex flex-col space-y-7">
      <Input
        type="text"
        label="Username"
        placeholder="Your username"
        form={{
          control,
          name: 'username',
          rules: {
            required: 'Username field is required',
          },
        }}
      />
      <Input
        type="email"
        label="Email"
        placeholder="Your email address"
        form={{
          control,
          name: 'email',
          rules: {
            required: 'Email field is required',
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Email must be a valid email',
            },
          },
        }}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        form={{
          control,
          name: 'password',
          rules: {
            required: 'Password field is required',
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[\w@$!%*?&]{6,}$/g,
              message:
                'Password must be 5 or more character and contain at least one letter and one number',
            },
          },
        }}
      />
      <div className="flex flex-col space-y-3">
        <label className="font-light" htmlFor="confirmPassword">
          Confirmation Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Your confirmation password"
          className="bg-transparent border py-3 px-4 rounded-md placeholder:text-gray-400 placeholder:text-sm placeholder:font-light"
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
