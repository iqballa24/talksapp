import React from 'react';

const WrapperMessages: React.FC<{ children: React.ReactElement[] }> = ({
  children,
}) => {
  const data = true;

  return (
    <div className="relative hidden md:flex flex-col md:w-6/12 lg:w-8/12 bg-grey-secondary">
      {!data && (
        <div className="absolute w-full max-w-md top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center text-center">
          <img src='cuate.svg' alt='talksapp background' className='w-3/4 py-8'/>
          <h1 className='text-3xl text-dark-secondary font-light mb-3'>TalksApp Web</h1>
          <p className='text-sm text-dark-secondary font-light'>Send and receive messages must keeping connect to internet.</p>
          <p className='text-sm text-dark-secondary font-light'>Use TalksApp web on up to 4 linked devices or more at the same time.</p>
        </div>
      )}
      {data && children}
    </div>
  );
};

export default WrapperMessages;
