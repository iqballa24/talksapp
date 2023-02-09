import React from 'react';
import { ButtonsProps } from '@/lib/types/PropTypes';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';

const Buttons: React.FC<ButtonsProps> = ({
  title,
  children,
  type,
  onClick,
  isPrimary,
  isSecondary,
  isDanger,
  isFull,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const className = [
    'inline-flex justify-center rounded px-4 py-2 text-sm font-medium ',
  ];

  isPrimary &&
    className.push(
      `${
        configColors[accentColor as keyof typeof configColors].button
      } text-white`
    );
  isSecondary &&
    className.push(
      `bg-transparent border border-grey text-${accentColor} hover:shadow-md dark:hover:bg-dark-third`
    );

  isDanger &&
    className.push(
      'border border-red text-red dark:text-white hover:bg-red-500 hover:text-white'
    );
  isFull && className.push('w-full');

  return (
    <button
      id={`button-${title}`}
      type={type}
      onClick={onClick}
      className={className.join(' ')}
    >
      {children}
    </button>
  );
};

export default Buttons;
