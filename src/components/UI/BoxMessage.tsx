import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';

const BoxMessage: React.FC<{
  title: string;
  text: string;
  visible: boolean;
}> = ({ title, text, visible }) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="animate-enter max-w-lg w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col md:flex-row ring-1 ring-black ring-opacity-5">
          <div className="flex-1 p-4">
            <div className="flex flex-col gap-4 md:gap-2 md:flex-row items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="./logo.svg"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{text}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Close
            </button>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default React.memo(BoxMessage);
