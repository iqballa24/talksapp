import React from 'react';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProfileProps } from '@/lib/types/PropTypes';

const Profile: React.FC<ProfileProps> = ({ displayName, about, photoURL }) => {
  const navigate = useNavigate();
  const srcImage =
    photoURL !== ''
      ? photoURL
      : `https://ui-avatars.com/api/?name=${displayName}`;

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
        <img src={srcImage} className="rounded-[50%] w-[85px] h-[85px]" />
      </motion.div>
      <div className="w-8/12 flex flex-col">
        <h1 className="text-dark dark:text-grey text-lg">{displayName}</h1>
        <p className="text-dark-secondary dark:text-grey/50">{about}</p>
      </div>
      <Tooltip
        className="z-30"
        anchorId="profile"
        content="Setting profile"
        place="bottom"
      />
    </div>
  );
};

export default React.memo(Profile);
