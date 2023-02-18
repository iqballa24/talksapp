import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Popover } from '@headlessui/react';
import PopOverItem from '@/components/UI/Popoveritem';
import ModalAddNewFriends from '@/components/UI/Modal/AddNewFriends';

import { MdGroups, MdPersonAdd, MdMoreVert, MdChat } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import { menuProfile } from '@/constant';
import { useAppSelector, useAppDispatch } from '@/lib/hooks/useRedux';
import { uiActions } from '@/store/ui';
import { Link } from 'react-router-dom';

const ChatsHeader = () => {
  const dispatch = useAppDispatch();
  const { ui, auth, users } = useAppSelector((state) => state);
  const { language } = ui;
  const { photoURL, displayName } = auth.user;

  const srcImage = photoURL
    ? photoURL
    : `https://ui-avatars.com/api/?name=${displayName}&background=09A683&color=fff`;

  const toggleModal = () => {
    dispatch(uiActions.toggleModalAddNewFriends());
  };

  return (
    <div
      className="flex flex-row items-center justify-between min-h-[62px] px-4 bg-grey-secondary dark:bg-dark"
      role="figure"
    >
      <Link to="/profile">
        <img
          id="profile"
          src={srcImage}
          alt="profile picture"
          className="rounded-[50%] w-10 h-10 cursor-pointer"
        />
        <Tooltip
          className="z-20"
          anchorId="profile"
          content={language === 'en' ? 'Profile' : 'Profil'}
        />
      </Link>
      <ul className="relative flex flex-row items-center space-x-7 text-dark-secondary dark:text-grey">
        <li id="friends" className="cursor-pointer relative">
          <Link to="/friends">
            <MdGroups size={22} role="button" />
            <Tooltip
              className="z-20"
              anchorId="friends"
              content={language === 'en' ? 'Friends' : 'Teman'}
            />
            {users.totalRequests > 0 && (
              <BsDot
                className="absolute -top-3 -right-4 text-red-600"
                size={32}
              />
            )}
          </Link>
        </li>
        <li id="group" className="cursor-pointer">
          <Link to="groups">
            <MdChat size={22} role="button" />
            <Tooltip className="z-20" anchorId="group" content="groups" />
          </Link>
        </li>
        <li id="newChat" className="cursor-pointer flex my-auto">
          <button type="button" onClick={toggleModal}>
            <MdPersonAdd size={22} role="button" />
            <Tooltip
              className="z-20"
              anchorId="newChat"
              content={language === 'en' ? 'Add friends' : 'Tambah teman'}
            />
          </button>
        </li>
        <li id="menu" className="cursor-pointer">
          <Popover className="flex items-center">
            <Popover.Button>
              <MdMoreVert size={22} role="button" />
            </Popover.Button>
            <PopOverItem className="-right-[86px] top-4" menus={menuProfile} />
          </Popover>
          <Tooltip className="z-20" anchorId="menu" content="Menu" />
        </li>
      </ul>
      <ModalAddNewFriends
        isShow={ui.showModalAddNewFriends}
        onClose={toggleModal}
      />
    </div>
  );
};

export default React.memo(ChatsHeader);
