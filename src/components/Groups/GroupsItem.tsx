import React from 'react';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { GroupsItemProps } from '@/lib/types/PropTypes';
import { chatsSliceAction } from '@/store/chats';
import { formatedDate } from '@/utils/formatedDate';
import { DocumentData } from 'firebase/firestore';
import { groupsSliceAction } from '@/store/groups';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '@/lib/hooks/useWindowSize';

const GroupsItem = ({
  chatId,
  groupInfo,
  lastMessage,
  time,
}: GroupsItemProps) => {
  const size = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const date = formatedDate({ time, showTime: false, showTodayTime: true });

  const { subject, photoURL } = groupInfo;

  const handleSelect = ({ chatId, groupInfo }: DocumentData) => {
    dispatch(
      chatsSliceAction.selectChat({
        chatId,
        status: 'active',
        isGroup: true,
      })
    );
    dispatch(groupsSliceAction.selectGroup({ ...groupInfo }));

    if (size.width < 560) {
      return navigate(`/message/${chatId}`);
    }
  };

  return (
    <li
      className="p-3 flex flex-row space-x-2 items-center hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
      onClick={() => handleSelect({ chatId, groupInfo })}
    >
      <div className="w-2/12">
        <img
          src={
            photoURL !== ''
              ? photoURL
              : `https://ui-avatars.com/api/?name=${subject}`
          }
          alt="profile user"
          className="w-[49px] h-[49px] rounded-[50%]"
        />
      </div>
      <div className="w-8/12 h-full flex flex-col justify-start">
        <span className="text-base text-dark dark:text-white">{subject}</span>
        <p className="text-sm text-gray-400 truncate">
          {lastMessage || 'click to start the conversation'}
        </p>
      </div>
      <div className="w-2/12 h-full flex justify-end">
        <time className="text-xs text-gray-400">{date}</time>
      </div>
    </li>
  );
};

export default React.memo(GroupsItem);
