import React, { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { Dialog, Transition } from '@headlessui/react';
import { Buttons } from '@/components/UI';
import { ModalProps } from '@/lib/types/PropTypes';
import { uiActions } from '@/store/ui';

const ModalSettingLang: React.FC<ModalProps> = ({ onClose, isShow }) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  const theme = [
    { id: 'id', name: 'Indonesia' },
    { id: 'en', name: 'English' },
  ];

  const changeLanguageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    dispatch(uiActions.changeLanguage(language));
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
                  {language === 'en' ? "Change language" :"Ganti bahasa"}
                  
                </Dialog.Title>
                <div className="flex flex-col space-y-2 mt-4">
                  {theme.map((item, index) => (
                    <div
                      key={index}
                      className="flex space-x-2 text-dark dark:text-grey"
                    >
                      <input
                        type="radio"
                        id={item.id}
                        name="theme"
                        value={item.id}
                        onChange={changeLanguageHandler}
                        checked={language === item.id}
                        className="cursor-pointer"
                      />
                      <label htmlFor={item.id} className="cursor-pointer">{item.name}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Buttons type="button" title="OK" onClick={onClose} isPrimary>
                    OK
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

export default ModalSettingLang;
