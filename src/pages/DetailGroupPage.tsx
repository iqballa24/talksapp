import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { userTypes } from '@/lib/types';
import { Header, RoundedImage, BoxText } from '@/components/UI';
import { asyncGetDetailMember } from '@/store/groups/action';
import { usersSliceAction } from '@/store/users';

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
    if (selectedGroup.idGroup) {
      dispatch(asyncGetDetailMember(selectedGroup.member));
    }
  }, [selectedGroup.idGroup]);

  useEffect(() => {
    if (!selectedChat.chatId) {
      navigate('/');
    }
  }, [selectedChat.chatId]);

  const clickUserHandler = ({
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
        <BoxText title="Username" text={selectedGroup.subject} />
        <BoxText
          title={language === 'en' ? 'Description' : 'Deskripsi'}
          text={selectedGroup.description}
        />
        <div className="flex flex-row flex-wrap px-4 sm:px-7 py-5">
          {detailMember.map((member) => {
            const { uid, displayName, email, about, photoURL } = member;
            return (
              <>
                <img
                  id={uid}
                  key={uid}
                  src={photoURL}
                  className="rounded-[50%] w-9 cursor-pointer hover:-translate-y-2 transition ease-out duration-300"
                  onClick={() =>
                    clickUserHandler({
                      uid,
                      displayName,
                      email,
                      about,
                      photoURL,
                    })
                  }
                  alt=""
                />
                <Tooltip
                  className="z-30"
                  anchorId={uid}
                  content={displayName}
                  place="bottom"
                />
              </>
            );
          })}
        </div>
      </motion.section>
    </>
  );
};

export default DetailGroupPage;
