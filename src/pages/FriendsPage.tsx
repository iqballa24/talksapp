import React from 'react';
import { Header, NewFriendsItem } from '@/components/UI';
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { asyncAcceptFriend, asyncRejectFriend } from '@/store/users/action';

const FriendsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ui, users } = useAppSelector((state) => state);

  const clickRejectHandler = (uid: string) => {
    dispatch(asyncRejectFriend(uid));
  };

  const clickAcceptHandler = ({ uid, displayName, photoURL }: DocumentData) => {
    dispatch(asyncAcceptFriend({ uid, displayName, photoURL }));
  };

  return (
    <>
      <Header name={ui.language === 'en' ? 'Friends' : 'Teman'} pathBack="/" />
      {users.listFriends.length === 0 && (
        <p className="font-light text-sm text-center text-dark-secondary dark:text-grey mt-8  ">
          {ui.language === 'en'
            ? '-- You don`t have any friends yet --'
            : '-- Anda belum punya teman --'}
        </p>
      )}
      <ul className="flex flex-col h-[100vh] w-full overflow-y-scroll scrollbar-hide">
        {users.listFriends.map((item: DocumentData, index: number) => (
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
    </>
  );
};

export default FriendsPage;
