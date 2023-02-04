import React from 'react';
import { Tooltip } from 'react-tooltip';
import { MdCheck, MdClose, MdAccessTime, MdDone } from 'react-icons/md';
import Buttons from '@/components/UI/Buttons';
import { NewFriendsItemProps } from '@/lib/types/PropTypes';
import { useAppSelector } from '@/lib/hooks/useRedux';

const NewFriendsItem: React.FC<NewFriendsItemProps> = ({
  userInfo,
  status,
  requestBy,
  onAdd,
  onAccept,
  onReject,
}) => {
  const { displayName, photoURL, email, uid } = userInfo;
  const srcImage =
    photoURL !== ''
      ? photoURL
      : `https://ui-avatars.com/api/?name=${displayName}`;

  const { auth, ui } = useAppSelector((state) => state);
  const isCurrentUser = auth.user.displayName === displayName;

  const buttonAction = (status: string) => {
    switch (status) {
      case 'pending':
        return requestBy === auth.user.uid ? (
          <>
            <MdAccessTime
              id="pending"
              size={24}
              className="text-dark-secondary dark:text-white"
            />
            <Tooltip
              className="z-20"
              anchorId="pending"
              content={
                ui.language === 'en' ? 'Waiting request' : 'permintaan menunggu'
              }
            />
          </>
        ) : (
          <>
            <Buttons
              title="accept"
              type="button"
              onClick={() => onAccept?.({ uid, displayName, photoURL })}
              isPrimary
            >
              <MdCheck size={18} />
            </Buttons>
            <Tooltip
              className="z-20"
              anchorId="button-accept"
              content={
                ui.language === 'en' ? 'Accept request' : 'Terima permintaan'
              }
            />
            <Buttons
              title="reject"
              type="button"
              onClick={() => onReject?.(uid)}
              isDanger
            >
              <MdClose size={18} />
            </Buttons>
            <Tooltip
              className="z-20"
              anchorId="button-reject"
              content={
                ui.language === 'en' ? 'Reject request' : 'Tolak permintaan'
              }
            />
          </>
        );
      case 'accepted':
        return (
          <MdDone size={22} className="text-dark-secondary dark:text-white" />
        );
      default:
        return (
          <Buttons
            title="add friend"
            type="button"
            onClick={() => onAdd?.(uid)}
            isPrimary
          >
            Add
          </Buttons>
        );
    }
  };

  return (
    <li className="p-3 flex flex-row justify-between gap-2 space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark">
      <div className="w-2/12">
        <img
          src={srcImage}
          alt=""
          className="w-[49px] h-[49px] rounded-[50%]"
        />
      </div>
      <div className="w-7/12 flex flex-col justify-start">
        <span className="text-base text-dark dark:text-white">
          {displayName}
        </span>
        <p className="text-sm text-gray-400 truncate">{email}</p>
      </div>
      <div className="w-3/12 flex flex-row gap-1 justify-end">
        {!isCurrentUser ? buttonAction(status) : ''}
      </div>
    </li>
  );
};

export default NewFriendsItem;
