import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/UI';
import { Editbox, EditAvatar } from '@/components/Profile';
import { useAppSelector, useAppDispatch } from '@/lib/hooks/useRedux';
import { asyncUpdateImageUser, asyncUpdateUser } from '@/store/users/action';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { ui, auth } = useAppSelector((state) => state);
  const { language } = ui;
  const { uid, displayName, about: aboutUser, photoURL } = auth.user;
  const nameHeader = language === 'en' ? 'Profile' : 'Profil';

  const [name, setName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [img, setImg] = useState<string>(
    `https://ui-avatars.com/api/?name=${displayName}&background=09A683&color=fff`
  );

  const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    dispatch(asyncUpdateImageUser({ uid, displayName: name, file }));
  };

  const nameChangeHandler = (name: string) => {
    setName(name);
  };

  const aboutChangeHandler = (about: string) => {
    setAbout(about);
  };

  const onSaveName = () => {
    dispatch(asyncUpdateUser(uid, { displayName: name.trim() }));
  };

  const onSaveAbout = () => {
    dispatch(asyncUpdateUser(uid, { about: about.trim() }));
  };

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  useEffect(() => {
    setAbout(aboutUser);
  }, [aboutUser]);

  useEffect(() => {
    if (photoURL === '') {
      setImg(
        `https://ui-avatars.com/api/?name=${displayName}&background=09A683&color=fff`
      );
    } else {
      setImg(photoURL);
    }
  }, [photoURL, displayName]);

  return (
    <>
      <Header name={nameHeader} pathBack="/" />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-grey-secondary dark:bg-dark-third h-full"
      >
        <EditAvatar img={img} onImgChange={imgChangeHandler} />
        <Editbox
          title={language === 'en' ? 'Your name' : 'Nama kamu'}
          value={name}
          onChange={nameChangeHandler}
          onSave={onSaveName}
        />
        <p className="text-sm text-gray-400 px-4 sm:px-7 pt-3 pb-6 leading-6">
          {language === 'en'
            ? 'This is your username. This name will be visible to your TalksApp Contacts.'
            : 'Ini username Anda. Nama ini akan terlihat oleh Kontak TalksApp Anda.'}
        </p>
        <Editbox
          title={language === 'en' ? 'About' : 'Tentang'}
          value={about}
          onChange={aboutChangeHandler}
          onSave={onSaveAbout}
        />
      </motion.section>
    </>
  );
};

export default ProfilePage;
