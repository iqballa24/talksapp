import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Buttons } from '@/components/UI';

const ModalSettingLang: React.FC<{ onClose: () => void; isShow: boolean }> = ({
  onClose,
  isShow,
}) => {
  const theme = ['Indonesia', 'English'];

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
                  Choose Language
                </Dialog.Title>
                <div className="flex flex-col space-y-2 mt-4">
                  {theme.map((item, index) => (
                    <div key={index} className="flex space-x-2 text-dark dark:text-grey">
                      <input type="radio" id={item} name="theme" value={item}/>
                      <label htmlFor={item}>{item}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Buttons type='button' title='OK' onClick={onClose} isPrimary>OK</Buttons>
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
