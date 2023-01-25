import React from 'react';
import { Link } from 'react-router-dom';
import { Buttons } from '@/components/UI';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-8 bg-grey-secondary dark:bg-dark dark:text-white w-full h-full lg:h-fit py-[64px] px-[60px]">
      <h2 className="font-light text-2xl" tabIndex={0}>
        Login to use TalksApp on your computer:
      </h2>
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
          />
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
          />
        </div>
        <Buttons
          type="submit"
          title="login"
          isPrimary
          onClick={() => console.log('test')}
        >
          Login
        </Buttons>
      </form>
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
