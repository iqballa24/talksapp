import React from 'react';
import { MdOutlineDone } from 'react-icons/md';
import Buttons from '@/components/UI/Buttons';
import { NewFriendsItemProps } from '@/lib/types/PropTypes';
import { useAppSelector } from '@/lib/hooks/useRedux';

const NewFriendsItem: React.FC<NewFriendsItemProps> = ({
  name,
  image,
  isFriends,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);

  return (
    <li className="p-3 flex flex-row gap-2 space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark">
      <div className="w-2/12 hidden sm:flex">
        <img
          src={image}
          alt=""
          className="w-full rounded-[50%]"
        />
      </div>
      <div className="w-7/12 h-full flex flex-col justify-start">
        <h1 className="text-base text-dark dark:text-white">{name}</h1>
      </div>
      <div className="w-3/12 h-full flex justify-end">
        {isFriends ? (
          <MdOutlineDone size={22} className={`text-${accentColor}`} />
        ) : (
          <Buttons
            title="tester"
            type="button"
            onClick={() => console.log()}
            isPrimary
          >
            Add
          </Buttons>
        )}
      </div>
    </li>
  );
};

export default NewFriendsItem;
