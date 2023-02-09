import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch,
  MdKeyboardArrowLeft,
  MdClose,
  MdLogout,
} from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { Searchbar } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { messageSliceAction } from '@/store/messages';

const HeaderGroup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ui, group } = useAppSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const { selectedGroup } = group

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(messageSliceAction.changeFilterMessage(target.value));
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
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
          onClick={() =>
            navigate(`/detail-group/${selectedGroup.subject}`)
          }
        >
          <img
            src={selectedGroup.photoURL}
            alt="profile picture"
            className="rounded-[50%] w-10 h-10"
          />
          <h1 className="text-dark dark:text-grey text-base truncate">
            {selectedGroup.subject}
          </h1>
        </div>
        <Tooltip
          className="z-20"
          anchorId="detailUser"
          content={
            ui.language === 'en'
              ? `See ${selectedGroup.subject}'s`
              : `Lihat detail ${selectedGroup.subject}`
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
        <MdLogout size={20} />
      </div>
    </div>
  );
};

export default React.memo(HeaderGroup);
