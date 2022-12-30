import React from 'react';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { Popover } from '@headlessui/react';
import PopOverItem from '@/components/UI/Popoveritem';

import {
  MdGroups,
  MdOutlineDonutLarge,
  MdChat,
  MdMoreVert,
} from 'react-icons/md';
import { menuProfile } from '@/constant';

const HeaderProfile = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center justify-between min-h-[62px] px-4 bg-grey-secondary dark:bg-dark"
      role="figure"
    >
      <img
        id="profile"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
        alt="profile picture"
        className="rounded-[50%] w-10 h-10 cursor-pointer"
        onClick={() => navigate('/profile')}
      />
      <Tooltip className="z-20" anchorId="profile" content="Profile" />
      <ul className="relative flex flex-row items-center space-x-7 text-dark-secondary dark:text-grey">
        <li id="group" className="cursor-pointer">
          <MdGroups size={22} role="button" />
          <Tooltip className="z-20" anchorId="group" content="Create group" />
        </li>
        <li id="status" className="cursor-pointer">
          <MdOutlineDonutLarge size={22} role="button" />
          <Tooltip className="z-20" anchorId="status" content="Status" />
        </li>
        <li id="newChat" className="cursor-pointer">
          <MdChat size={22} role="button" />
          <Tooltip className="z-20" anchorId="newChat" content="New chat" />
        </li>
        <li id="menu" className="cursor-pointer">
          <Popover className='flex items-center'>
            <Popover.Button>
              <MdMoreVert size={22} role="button" />
            </Popover.Button>
            <PopOverItem className="-right-[86px] top-4" menus={menuProfile} />
          </Popover>
          <Tooltip className="z-20" anchorId="menu" content="Menu" />
        </li>
      </ul>
    </div>
  );
};

export default React.memo(HeaderProfile);
