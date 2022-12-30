import React from 'react';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div
      id="profile"
      onClick={() => navigate('/profile')}
      className="flex flex-row items-center  p-3 md:p-5 hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
      role="figure"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        className="w-4/12"
      >
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
          alt="profile picture"
          className="rounded-[50%] w-[85px] h-[85px]"
        />
      </motion.div>
      <div className="w-8/12 flex flex-col">
        <h1 className="text-dark dark:text-grey text-lg">Mikasa</h1>
        <p className="text-dark-secondary dark:text-grey/50">Can`t talk talksapp only!</p>
      </div>
      <Tooltip className="z-30" anchorId="profile" content="Setting profile" place="bottom"/>
    </div>
  );
};

export default React.memo(Profile);
