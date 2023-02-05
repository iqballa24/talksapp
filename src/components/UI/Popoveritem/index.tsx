import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { Popover, Transition } from '@headlessui/react';
import { PopoverProps } from '@/lib/types/PropTypes';

import { unSetAuthUser } from '@/store/auth/action';
import { useAppDispatch } from '@/lib/hooks/useRedux';

const PopOverItem: React.FC<PopoverProps> = ({ className, menus }) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const navigate = useNavigate();
  const classes = [
    'absolute z-20 mt-5 w-full max-w-[180px] -translate-x-1/2 transform px-4 sm:px-0',
  ];
  classes.push(className);

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Popover.Panel className={classes.join(' ')}>
        <div className="overflow-hidden rounded shadow-xl ring-1 ring-black ring-opacity-5">
          <ul className="bg-white py-2 w-full text-sm text-dark dark:text-grey dark:bg-dark shadow-sm">
            {menus.map((menu) => {
              if (menu.path !== '/logout') {
                return (
                  <li
                    key={menu.id}
                    className="pl-6 py-3 hover:bg-gray-50 dark:hover:bg-dark-third cursor-pointer"
                    onClick={() => navigate(menu.path)}
                  >
                    {menu.name[language as keyof typeof menu.name]}
                  </li>
                );
              }
              return (
                <li
                  key={menu.id}
                  className="pl-6 py-3 hover:bg-gray-50 dark:hover:bg-dark-third cursor-pointer"
                  onClick={() => dispatch(unSetAuthUser())}
                >
                  {menu.name[language as keyof typeof menu.name]}
                </li>
              );
            })}
          </ul>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default PopOverItem;
