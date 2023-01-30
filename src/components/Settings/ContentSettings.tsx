import React from 'react';
import { useNavigate } from 'react-router';
import {
  MdColorLens,
  MdInvertColors,
  MdOutlineHelp,
  MdLanguage,
  MdSecurity,
} from 'react-icons/md';

import { Profile, ItemMenuSetting } from '@/components/Settings';
import {
  ModalSettingTheme,
  ModalSettingLang,
  ModalSettingColors,
} from '@/components/UI';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { uiActions } from '@/store/ui';

const ContentSettings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showModalColors, showModalLang, showModalTheme, language } =
    useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);

  const toggleModalTheme = () => {
    dispatch(uiActions.toggleModalTheme());
  };

  const toggleModalLang = () => {
    dispatch(uiActions.toggleModalLang());
  };

  const toggleModalColors = () => {
    dispatch(uiActions.toggleModalColors());
  };

  const menusSetting = [
    {
      id: 1,
      name: language === 'en' ? 'Theme' : 'Tema',
      onClick: toggleModalTheme,
      duration: 0.4,
      icon: MdInvertColors,
    },
    {
      id: 2,
      name: language === 'en' ? 'Accent Colors' : 'Warna Aksen',
      onClick: toggleModalColors,
      duration: 0.7,
      icon: MdColorLens,
    },
    {
      id: 3,
      name: language === 'en' ? 'Language' : 'Bahasa',
      onClick: toggleModalLang,
      duration: 1,
      icon: MdLanguage,
    },
    {
      id: 4,
      name: language === 'en' ? 'Security' : 'Keamanan',
      onClick: () => navigate('/security'),
      duration: 1.3,
      icon: MdSecurity,
    },
    {
      id: 5,
      name: language === 'en' ? 'About' : 'Tentang',
      onClick: () => navigate('/about'),
      duration: 1.6,
      icon: MdOutlineHelp,
    },
  ];

  return (
    <section className="flex flex-col w-full h-full bg-white dark:bg-dark-third">
      <Profile {...user} />
      <ul className="flex flex-col">
        {menusSetting.map((menu) => (
          <ItemMenuSetting
            key={menu.id}
            duration={menu.duration}
            onClick={menu.onClick}
          >
            <menu.icon size={22} className="text-gray-400" />
            <span>{menu.name}</span>
          </ItemMenuSetting>
        ))}
      </ul>
      <ModalSettingTheme onClose={toggleModalTheme} isShow={showModalTheme} />
      <ModalSettingLang onClose={toggleModalLang} isShow={showModalLang} />
      <ModalSettingColors
        onClose={toggleModalColors}
        isShow={showModalColors}
      />
    </section>
  );
};

export default React.memo(ContentSettings);
