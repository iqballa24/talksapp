import React from 'react';
import { Header, NewFriendsItem, Tabs } from '@/components/UI';
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { asyncAcceptFriend, asyncRejectFriend } from '@/store/users/action';

const FriendsPage = () => {
  const dispatch = useAppDispatch();
  const { ui, users } = useAppSelector((state) => state);

  const clickRejectHandler = (uid: string) => {
    dispatch(asyncRejectFriend(uid));
  };

  const clickAcceptHandler = ({ uid, displayName, photoURL }: DocumentData) => {
    dispatch(asyncAcceptFriend({ uid, displayName, photoURL }));
  };

  const data = {
    [`${ui.language === 'en'? "Friends" : "Teman"}`]: (
      <ul className="flex flex-col h-[100vh] w-full overflow-y-scroll scrollbar-hide">
        {users.listFriends
          .filter((item: DocumentData) => item.status === 'accepted')
          .map((item: DocumentData, index: number) => (
            <NewFriendsItem
              key={index}
              userInfo={item.userInfo}
              requestBy={item.requestBy}
              status={item.status}
              onAccept={clickAcceptHandler}
              onReject={clickRejectHandler}
            />
          ))}
      </ul>
    ),
    [`${ui.language === "en" ? "Requests" : "Permintaan"} (${users.totalRequests})`]: (
      <ul className="flex flex-col h-[100vh] w-full overflow-y-scroll scrollbar-hide">
        {users.listFriends
          .filter((item: DocumentData) => item.status === 'pending')
          .map((item: DocumentData, index: number) => (
            <NewFriendsItem
              key={index}
              userInfo={item.userInfo}
              requestBy={item.requestBy}
              status={item.status}
              onAccept={clickAcceptHandler}
              onReject={clickRejectHandler}
            />
          ))}
      </ul>
    ),
  };

  return (
    <>
      <Header name={ui.language === 'en' ? 'Friends' : 'Teman'} pathBack="/" />
      <Tabs data={data} />
      {users.listFriends.length === 0 && (
        <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-8  ">
          {ui.language === 'en'
            ? '-- You don`t have any friends yet --'
            : '-- Anda belum punya teman --'}
        </p>
      )}
    </>
  );
};

export default FriendsPage;
