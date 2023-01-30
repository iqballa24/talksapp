import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { asyncSearchUsers } from '@/store/users/action';
import { Buttons } from '@/components/UI';
import { Searchbar, NewFriendsItem } from '@/components/UI';
import { userTypes } from '@/lib/types';
import { ModalProps } from '@/lib/types/PropTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import useDebounce from '@/lib/hooks/useDebounce';

const ModalAddNewFriends: React.FC<ModalProps> = ({ onClose, isShow }) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const { resultSearch } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const deb = useDebounce(searchVal, 800);

  useEffect(() => {
    dispatch(asyncSearchUsers(searchVal));
  }, [deb]);

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchVal(target.value);
  };

  return (
    <Transition appear show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded bg-white dark:bg-dark p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-dark dark:text-grey"
                >
                  Add new friends
                </Dialog.Title>
                <div className="flex flex-col space-y-2 mt-4">
                  <Searchbar
                    onSearch={onSearch}
                    placeholder="Search username"
                  />
                  <ul className="flex flex-col">
                    {resultSearch.length > 0 ?
                      resultSearch.map((item: userTypes, index) => {
                        const { displayName, photoURL,email } = item;
                        const srcImage =
                          item.photoURL !== ''
                            ? photoURL
                            : `https://ui-avatars.com/api/?name=${displayName}`;

                        return (
                          <NewFriendsItem
                            key={index}
                            name={displayName}
                            email={email}
                            image={srcImage}
                            onClick={() => console.log()}
                            isFriends={false}
                          />
                        );
                      }): <p className='text-xs text-gray-400 text-center py-3'>-- No items are displayed --</p>}
                  </ul>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Buttons
                    type="button"
                    title="OK"
                    onClick={onClose}
                    isSecondary
                  >
                    Close
                  </Buttons>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalAddNewFriends;
