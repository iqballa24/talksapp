import React from 'react';
import { useForm } from 'react-hook-form';
import { Buttons, Input } from '@/components/UI';

import { FormValues, FormLoginTypes } from '@/lib/types';

const FormLogin: React.FC<{
  submitHandler: (data: FormLoginTypes) => void;
}> = ({ submitHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className="flex flex-col space-y-7">
      <Input
        type="email"
        label="Email address"
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
                'Password must be 6 or more character and contain at least one letter and one number',
            },
          },
        }}
      />
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
