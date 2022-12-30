import React from 'react';
import { motion } from 'framer-motion';
import { ItemSettingProps } from '@/lib/types/PropTypes';

const ItemMenuSetting: React.FC<ItemSettingProps> = ({
  children,
  duration,
  onClick,
}) => {
  return (
    <motion.li
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ duration: duration }}
      className="flex flex-row items-center space-x-5 px-3 md:px-5 py-5 border-b border-grey text-[17px] text-dark hover:bg-gray-50 cursor-pointer dark:text-grey dark:hover:bg-dark dark:border-dark-secondary"
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
};

export default ItemMenuSetting;
