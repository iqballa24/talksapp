import React from 'react';
import { motion } from 'framer-motion';
import { ItemMenuSettingTypes } from '@/util/type';

const ItemMenuSetting: React.FC<ItemMenuSettingTypes> = ({
  children,
  duration,
  onClick,
}) => {
  return (
    <motion.li
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ duration: duration }}
      className="flex flex-row items-center space-x-5 px-3 md:px-5 py-5 border-b text-[17px] text-dark hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
};

export default ItemMenuSetting;
