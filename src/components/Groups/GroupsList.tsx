import React from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import useListenerGroups from '@/lib/hooks/useListenerGroups';
import GroupsItem from '@/components/Groups/GroupsItem';
import { DocumentData } from 'firebase/firestore';

const GroupsList = () => {
  const { ui, auth, group } = useAppSelector((state) => state);

  useListenerGroups(auth.user.uid);

  if (group.list.length === 0) {
    return (
      <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-5">
        {ui.language === 'en'
          ? '-- You don`t have any groups yet --'
          : '-- Anda belum memiliki grup --'}
      </p>
    );
  }

  const groupsFilter = [...group.list].sort(
    (a, b) => b.groupInfo.createdAt - a.groupInfo.createdAt
  );

  return (
    <ul className="flex flex-col h-[600px] overflowy-scroll divide-y dark:divide-dark-secondary/50 bg-white dark:bg-dark-third">
      {groupsFilter.map((group: DocumentData) => (
        <GroupsItem
          key={group.idGroup}
          chatId={group.idGroup}
          groupInfo={group.groupInfo}
          lastMessage={group.lastMessage}
          time={group.date}
        />
      ))}
    </ul>
  );
};

export default React.memo(GroupsList);
