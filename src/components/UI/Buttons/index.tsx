import React from 'react';
import { ButtonsTypes } from '@/util/type';

const Buttons: React.FC<ButtonsTypes> = ({
  title,
  children,
  type,
  onClick,
  isPrimary,
  isSecondary,
}) => {
  const className = [
    'inline-flex justify-center rounded px-4 py-2 text-sm font-medium ',
  ];

  isPrimary && className.push('bg-primary text-white hover:bg-primary-100');
  isSecondary &&
    className.push('bg-transparent border text-primary hover:shadow-md');

  return (
    <>
      <button
        id={`button-${title}`}
        type={type}
        onClick={onClick}
        className={className.join(' ')}
      >
        {children}
      </button>
    </>
  );
};

export default Buttons;
