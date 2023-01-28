import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerTypes } from '@/lib/types';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { asyncRegisterUser } from '@/store/auth/action';
import { toast } from 'react-hot-toast';

import FormRegister from '@/components/Form/FormRegister';
import { BoxMessage } from '@/components/UI';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (data: registerTypes) => {
    const { email, password, username } = data;

    try {
      const { error } = await dispatch(
        asyncRegisterUser({ email, password, username })
      );

      if (error) return;

      toast.custom((t) => (
        <BoxMessage
          title="Account created successfully"
          text="to complete the registration process please check your email.
            We`ve just sent a verification link to your email."
          visible={t.visible}
        />
      ));

      setTimeout(() => {
        navigate('/');
      }, 6000);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white dark:bg-dark dark:text-white w-full h-full lg:max-h-[600px] py-[64px] px-[60px] overflow-y-scroll">
      <h2 className="font-light text-2xl" tabIndex={0}>
        Register to use TalksApp on your computer:
      </h2>
      <FormRegister submitHandler={submitHandler} />
      <div className="space-y-5 text-center">
        <hr />
        <p className="text-gray-400 dark:text-white font-light text-sm">
          Already have an account ?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            login now.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
