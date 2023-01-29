import React from 'react';
import { InputProps } from '@/lib/types/PropTypes';

const Input: React.FC<InputProps> = ({id, name, placeholder}) => {
  return (
    <div className="relative pl-5 pr-4 py-2 rounded-lg w-full bg-white text-dark-secondary dark:bg-dark-secondary/30">
      <input
      id={id}
      name={name}
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full outline-none text-base"
      />
    </div>
  );
};

export default React.memo(Input);
