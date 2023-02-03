import { configColors } from '@/constant/configColors';
import { useAppSelector } from '@/lib/hooks/useRedux';
import React from 'react';

const BoxText: React.FC<{ text: string; title: string }> = ({
  text,
  title,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const selectedColor = configColors[accentColor as keyof typeof configColors];
  const textColor = selectedColor.textColor.default;

  return (
    <div className="flex flex-col px-4 sm:px-7 py-5 space-y-3 bg-white dark:bg-dark-third shadow-sm">
      <h1 className={`text-sm ${textColor}`}>{title}</h1>
      <div className="flex flex-row items-center justify-between">
        <span className="text-dark dark:text-grey text-[17px] w-full pr-4">
          {text}
        </span>
      </div>
    </div>
  );
};

export default React.memo(BoxText);
