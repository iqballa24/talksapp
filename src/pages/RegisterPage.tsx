import React from 'react';
import { Link } from 'react-router-dom';
import { Buttons } from '@/components/UI';

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-8 bg-white w-full h-full lg:max-h-[600px] py-[64px] px-[60px] overflow-y-scroll">
      <h2 className="font-light text-2xl" tabIndex={0}>
        Register to use TalksApp on your computer:
      </h2>
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
          />
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
        <div className="flex flex-col space-y-3">
          <label className="font-light" htmlFor="confirmPassword">
            Confirmation Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Your confirmation password"
            className="bg-transparent border py-2 px-3 rounded"
          />
        </div>
        <Buttons
          type="submit"
          title="register"
          isPrimary
          onClick={() => console.log('test')}
        >
          Register
        </Buttons>
      </form>
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
