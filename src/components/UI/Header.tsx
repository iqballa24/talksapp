import React from 'react';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const Header: React.FC<{ path: string; name: string }> = ({ path, name }) => {
  return (
    <header className="flex flex-col-reverse bg-primary-100 md:h-full md:max-h-[108px] p-5">
      <motion.div
        initial={{ x: -30 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 0.4 }}
        className="flex flex-row space-x-5 items-center"
      >
        <Link to={path}>
          <MdArrowBack id='back' size={24} className="text-white cursor-pointer" />
        </Link>
        <h1 className="text-white text-lg font-medium">{name}</h1>
      </motion.div>
      <Tooltip
        className="z-30"
        anchorId="back"
        content="Back"
        place="bottom"
      />
    </header>
  );
};

export default React.memo(Header);
