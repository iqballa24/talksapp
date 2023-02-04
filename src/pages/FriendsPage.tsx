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
    console.log(uid);
    dispatch(asyncRejectFriend(uid));
  };

  const clickAcceptHandler = ({ uid, displayName, photoURL }: DocumentData) => {
    dispatch(asyncAcceptFriend({ uid, displayName, photoURL }));
  };

  return (
    <>
      <Header name={ui.language === 'en' ? 'Friends' : 'Teman'} pathBack="/" />
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
