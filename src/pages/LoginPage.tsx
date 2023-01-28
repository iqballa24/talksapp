import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import FormLogin from '@/components/Form/FormLogin';
import { FormLoginTypes } from '@/lib/types';
import { asyncLoginUser } from '@/store/auth/action';
import { useAppDispatch } from '@/lib/hooks/useRedux';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const submitHandler = async (data: FormLoginTypes) => {
    const { email, password } = data;
    try {
      await dispatch(asyncLoginUser({ email, password }));
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-dark dark:text-white w-full h-full lg:h-fit py-[64px] px-[60px]">
      <h2 className="font-light text-2xl" tabIndex={0}>
        Login to use TalksApp on your computer:
      </h2>
      <FormLogin submitHandler={submitHandler} />
      <div className="space-y-5 text-center">
        <hr />
        <p className="text-gray-400 dark:text-white font-light text-sm">
          Dont have an account ?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
