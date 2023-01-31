import React from 'react';
import { MdOutlineDone } from 'react-icons/md';
import Buttons from '@/components/UI/Buttons';
import { NewFriendsItemProps } from '@/lib/types/PropTypes';
import { useAppSelector } from '@/lib/hooks/useRedux';

const NewFriendsItem: React.FC<NewFriendsItemProps> = ({
  uid,
  name,
  email,
  image,
  isFriends,
  onClick,
}) => {
  const { ui, auth } = useAppSelector((state) => state);
  const isCurrentUser = auth.user.displayName === name;

  return (
    <li className="p-3 flex flex-row gap-2 space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark">
      <div className="w-2/12 hidden sm:flex">
        <img src={image} alt="" className="w-full rounded-[50%]" />
      </div>
      <div className="w-7/12 h-full flex flex-col justify-start">
        <span className="text-base text-dark dark:text-white">{name}</span>
        <p className="text-sm text-gray-400 truncate">{email}</p>
      </div>
      <div className="w-3/12 h-full flex justify-end">
        {!isCurrentUser ? (
          isFriends ? (
            <MdOutlineDone size={22} className={`text-${ui.accentColor}`} />
          ) : (
            <Buttons
              title="tester"
              type="button"
              onClick={() =>
                onClick({ uid, displayName: name, photoURL: image })
              }
              isPrimary
            >
              Add
            </Buttons>
          )
        ) : (
          ''
        )}
      </div>
    </li>
  );
};

export default NewFriendsItem;
