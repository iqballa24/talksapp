import React from 'react';
import { MdSearch,
  MdMoreVert,
} from 'react-icons/md';

const HeaderMessages = () => {
  return (
    <div
      className="flex flex-row items-center justify-between min-h-[62px] px-4 bg-grey-secondary dark:bg-dark"
      role="figure"
    >
      <div className="flex flex-row items-center space-x-5">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
          alt="profile picture"
          className="rounded-[50%] w-10 h-10"
        />
        <h1 className="text-dark dark:text-grey text-base">Iqbal Nugraha</h1>
      </div>
      <div className="flex flex-row space-x-7 text-dark-secondary dark:text-grey">
        <MdSearch className='cursor-pointer' size={24} role="button" />
        <MdMoreVert className='cursor-pointer' size={24} role="button" />
      </div>
    </div>
  );
};

export default React.memo(HeaderMessages);
