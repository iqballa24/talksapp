import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Buttons, NewFriendsItem } from '@/components/UI';
import { ModalProps } from '@/lib/types/PropTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { listFriendsTypes, userTypes } from '@/lib/types';
import { asyncAddNewMembers } from '@/store/groups/action';

const ModalAddNewMembers: React.FC<ModalProps> = ({ onClose, isShow }) => {
  const dispatch = useAppDispatch();
  const { users, ui } = useAppSelector((state) => state);
  const { listFriends } = users;

  const onClickAdd = async (uid: string) => {
    dispatch(asyncAddNewMembers(uid));
  };

  const friends = listFriends
    .filter((item: listFriendsTypes) => item.status === 'accepted')
    .map((item: listFriendsTypes) => item.userInfo);

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
                  className="text-lg pb-2 font-medium leading-6 text-dark dark:text-grey"
                >
                  {ui.language === 'en'
                    ? 'Add new members'
                    : 'Tambah anggota baru'}
                </Dialog.Title>
                <ul className="flex flex-col mt-4 max-h-56 overflow-scroll">
                  {friends.length > 0 ? (
                    friends.map((item: userTypes, index) => (
                      <NewFriendsItem
                        key={index}
                        userInfo={item}
                        onAdd={onClickAdd}
                        status=""
                      />
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-3">
                      {ui.language === 'en'
                        ? 'No items are displayed'
                        : 'Tidak ada item yang ditampilkan'}
                    </p>
                  )}
                </ul>
                <div className="flex justify-end space-x-2 mt-4">
                  <Buttons
                    type="button"
                    title="OK"
                    onClick={onClose}
                    isSecondary
                  >
                    {ui.language === 'en' ? 'Close' : 'Tutup'}
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

export default ModalAddNewMembers;
