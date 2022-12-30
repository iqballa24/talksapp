import React from 'react';

const ChatItem = () => {
  return (
    <li className="p-3 flex flex-row space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark cursor-pointer">
      <div className="w-2/12">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
          alt="profile user"
          className="w-[49px] h-[49px] rounded-[50%]"
        />
      </div>
      <div className="w-8/12 h-full flex flex-col justify-start">
        <h1 className='text-base text-dark dark:text-white'>Tester</h1>
        <p className='text-sm text-gray-400'>Tester</p>
      </div>
      <div className='w-2/12 h-full flex justify-end'>
        <time className='text-xs text-gray-400'>4:42pm</time>
      </div>
    </li>
  );
};

export default React.memo(ChatItem);
