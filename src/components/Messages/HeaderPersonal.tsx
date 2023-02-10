import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch,
  MdKeyboardArrowLeft,
  MdClose,
  MdOutlineArchive,
  MdOutlineUnarchive,
} from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { Searchbar } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { messageSliceAction } from '@/store/messages';
import { asycnChangeStatusChat } from '@/store/chats/action';

const HeaderPersonal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { chats, ui, users } = useAppSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const { selectedChat } = chats;
  const { selectedUser } = users;

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(messageSliceAction.changeFilterMessage(target.value));
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const changeStatusChat = (uid: string, status: string) => {
    dispatch(asycnChangeStatusChat(uid, status));
  };

  return (
    <div
      className="flex flex-row items-center justify-between min-h-[62px] px-4 bg-grey-secondary dark:bg-dark"
      role="figure"
    >
      <div className="flex flex-row items-center space-x-2">
        <MdKeyboardArrowLeft
          id="back"
          size={22}
          className="flex h-full min-w-['42px'] md:hidden text-dark-secondary dark:text-grey cursor-pointer"
          onClick={() => navigate('/')}
        />
        <Tooltip
          className="z-20"
          anchorId="back"
          content={ui.language === 'en' ? 'Back' : 'Kembali'}
          place="bottom"
        />
        <div
          id="detailUser"
          className="flex flex-row items-center space-x-4 cursor-pointer"
          onClick={() => navigate(`/detail-user/${selectedUser.displayName}`)}
        >
          <img
            src={
              selectedUser.photoURL === ''
                ? `https://ui-avatars.com/api/?name=${selectedUser.displayName}`
                : selectedUser.photoURL
            }
            alt="profile picture"
            className="rounded-[50%] w-10 h-10"
          />
          <h1 className="text-dark dark:text-grey text-base truncate">
            {selectedUser.displayName}
          </h1>
        </div>
        <Tooltip
          className="z-20"
          anchorId="detailUser"
          content={
            ui.language === 'en'
              ? `See ${selectedUser.displayName}'s profile`
              : `Lihat profil ${selectedUser.displayName}`
          }
          place="bottom"
        />
      </div>
      <div className="relative flex flex-row gap-5 justify-center items-center text-dark-secondary dark:text-grey h-full">
        <AnimatePresence>
          {showSearch ? (
            <motion.div
              key="searchbar"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              exit={{ opacity: 0 }}
              transition={{
                stiffness: 260,
                damping: 20,
              }}
              className="flex flex-row items-center"
            >
              <Searchbar
                onSearch={onSearch}
                placeholder={`${
                  ui.language === 'en' ? 'Search messages' : 'Cari pesan'
                }`}
              />
              <MdClose
                onClick={toggleSearch}
                className="cursor-pointer hover:text-red-400"
              />
            </motion.div>
          ) : (
            <MdSearch
              size={22}
              className="h-full cursor-pointer min-w-['42px']"
              onClick={toggleSearch}
            />
          )}
        </AnimatePresence>
        {selectedChat.status === 'active' ? (
          <>
            <MdOutlineArchive
              id="archive"
              size={24}
              className="h-full cursor-pointer min-w-['42px']"
              onClick={() => changeStatusChat(selectedUser.uid, 'archive')}
            />
            <Tooltip
              className="z-20"
              anchorId="archive"
              content={ui.language === 'en' ? 'Archive' : 'Arsip'}
              place="bottom"
            />
          </>
        ) : (
          <>
            <MdOutlineUnarchive
              id="Unarchive"
              size={24}
              className="h-full cursor-pointer min-w-['42px']"
              onClick={() => changeStatusChat(selectedUser.uid, 'active')}
            />
            <Tooltip
              className="z-20"
              anchorId="Unarchive"
              content={ui.language === 'en' ? 'Unarchive' : 'Batalkan arsip'}
              place="bottom"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(HeaderPersonal);
