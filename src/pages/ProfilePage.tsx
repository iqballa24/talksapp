import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/UI';
import { Editbox, EditAvatar } from '@/components/Profile';

const ProfilePage = () => {
  const [name, setName] = useState<string>('Mikasa');
  const [about, setAbout] = useState<string>('Can`t talk, WhatsApp only');
  const [img, setImg] = useState<string>(
    'https://www.w3schools.com/howto/img_avatar.png'
  );

  const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const imgUrl: string = reader.result as string;
      setImg(imgUrl);
    };
    reader.readAsDataURL(file);
  };

  const nameChangeHandler = (name: string) => {
    setName(name);
  };

  const aboutChangeHandler = (about: string) => {
    setAbout(about);
  };

  return (
    <>
      <Header name="Profile" pathBack="/" />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-grey-secondary dark:bg-dark-third h-full"
      >
        <EditAvatar img={img} onImgChange={imgChangeHandler} />
        <Editbox title="Your name" value={name} onChange={nameChangeHandler} />
        <p className="text-sm text-gray-400 px-4 sm:px-7 pt-3 pb-6 leading-6">
          This is not your username or ID. This name will be visible to your
          TalksApp Contacts.
        </p>
        <Editbox title="About" value={about} onChange={aboutChangeHandler} />
      </motion.section>
    </>
  );
};

export default ProfilePage;
