import React, { KeyboardEvent } from 'react';
import { InputProps } from '@/lib/types/PropTypes';

const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  placeholder,
  changeHandler,
  enterHandler,
}) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enterHandler();
    }
  };

  return (
    <div className="relative pl-5 pr-4 py-2 rounded-lg w-full bg-white text-dark-secondary dark:bg-dark-secondary/30 dark:text-white">
      <input
        id={id}
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full outline-none text-base"
        onChange={changeHandler}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default React.memo(Input);
