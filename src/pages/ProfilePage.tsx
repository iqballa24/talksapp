import React from 'react';
import { MdInsertPhoto, MdEdit } from 'react-icons/md';
import { Header } from '@/components/UI';

const ProfilePage = () => {
  return (
    <>
      <Header name="Profile" path="/" />
      <section className="flex flex-col bg-grey-secondary h-full">
        <div className="w-full py-7 flex justify-center transition-all relative">
          <label
            htmlFor="file"
            className="flex flex-col space-y-2 justify-center items-center rounded-[50%] w-[200px] h-[200px] border cursor-pointer z-20 opacity-0 hover:opacity-100 hover:bg-dark/50"
          >
            <MdInsertPhoto size={26} color="white" />
            <span className="text-white text-xs text-center">
              CHANGE <br />
              PROFILE PHOTO
            </span>
          </label>
          <input id="file" type="file" className="hidden" />
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="profile picture"
            className="absolute rounded-[50%] w-[200px] h-[200px] z-0"
          />
        </div>
        <div className="flex flex-col px-4 sm:px-7 py-3 space-y-3 bg-white shadow-sm">
          <h1 className="text-sm text-dark-secondary">Your name</h1>
          <div className="flex flex-row items-center justify-between">
            <span className="text-dark py-2 text-[17px]">Mikasa</span>
            <MdEdit size={22} className="text-gray-400" />
          </div>
        </div>
        <p className="text-sm text-gray-400 px-4 sm:px-7 pt-3 pb-6 leading-6">
          This is not your username or ID. This name will be visible to your
          TalksApp Contacts.
        </p>
        <div className="flex flex-col px-4 sm:px-7 py-3 space-y-3 bg-white shadow-sm">
          <h1 className="text-sm text-dark-secondary">About</h1>
          <div className="flex flex-row items-center justify-between">
            <span className="text-dark py-2 text-[17px]">Can`t talk, WhatsApp only</span>
            <MdEdit size={22} className="text-gray-400" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
