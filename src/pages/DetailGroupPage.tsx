import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { userTypes } from '@/lib/types';
import {
  Header,
  RoundedImage,
  BoxText,
  ModalAddNewMembers,
} from '@/components/UI';
import { usersSliceAction } from '@/store/users';
import MembersAction from '@/components/Groups/MembersAction';
import { uiActions } from '@/store/ui';
import { asyncGetDetailMember } from '@/store/groups/action';

const DetailGroupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ui, chats, group } = useAppSelector((state) => state);
  const { selectedChat } = chats;
  const { selectedGroup, detailMember } = group;
  const { language } = ui;

  const size = useWindowSize();
  const pathBack =
    size.width > 560 ? '/groups' : `/message/${selectedGroup.idGroup}`;

  useEffect(() => {
    if (!selectedChat.chatId) {
      navigate('/');
    }
  }, [selectedChat.chatId]);

  const clickMemberHandler = ({
    uid,
    displayName,
    about,
    photoURL,
    email,
  }: userTypes) => {
    dispatch(
      usersSliceAction.selectUser({ uid, displayName, about, photoURL, email })
    );
    navigate(`/detail-user/${displayName}`);
  };

  const toggleModalAddNewMembers = () => {
    dispatch(uiActions.toggleModalAddNewMembers());
  };

  useEffect(() => {
    if (selectedGroup.idGroup) {
      dispatch(asyncGetDetailMember(selectedGroup.member));
    }
  }, [selectedGroup.idGroup, selectedGroup.member]);

  return (
    <>
      <Header name={selectedGroup.subject} pathBack={pathBack} />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-white dark:bg-dark-third h-full"
      >
        <div className="flex ml-auto mr-auto py-7">
          <RoundedImage src={selectedGroup.photoURL} />
        </div>
        <BoxText title="Subject" text={selectedGroup.subject} />
        <BoxText
          title={language === 'en' ? 'Description' : 'Deskripsi'}
          text={selectedGroup.description}
        />
        <MembersAction
          members={detailMember}
          onClickMember={clickMemberHandler}
          onClickAddMember={toggleModalAddNewMembers}
        />
        <ModalAddNewMembers
          isShow={ui.showModalAddNewMembers}
          onClose={toggleModalAddNewMembers}
        />
      </motion.section>
    </>
  );
};

export default DetailGroupPage;
