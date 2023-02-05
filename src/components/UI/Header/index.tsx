import React from 'react';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';
import { HeaderProps } from '@/lib/types/PropTypes';

const Header: React.FC<HeaderProps> = ({ pathBack, name }) => {
  const { accentColor, language } = useAppSelector((state) => state.ui);
  const bgColor =
    configColors[accentColor as keyof typeof configColors].bgColor[100];

  return (
    <header
      className={`flex flex-col-reverse ${bgColor} dark:bg-dark md:min-h-[108px] p-5 z-20`}
    >
      <motion.div
        initial={{ x: -30 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 0.4 }}
        className="flex flex-row space-x-5 items-center"
      >
        <Link to={pathBack}>
          <MdArrowBack
            id="back"
            size={24}
            className="text-white dark:text-grey cursor-pointer"
          />
        </Link>
        <h1 className="text-white dark:text-grey text-lg font-medium">
          {name}
        </h1>
      </motion.div>
      <Tooltip className="z-30" anchorId="back" content={language === 'en' ? "Back" : "Kembali"} place="bottom" />
    </header>
  );
};

export default React.memo(Header);
