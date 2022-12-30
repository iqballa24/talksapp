import React, { useState } from 'react';
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

const ContentSettings = () => {
  const navigate = useNavigate();
  const [showModalTheme, setShowModalTheme] = useState(false);
  const [showModalLang, setShowModalLang] = useState(false);
  const [showModalColors, setShowModalColors] = useState(false);

  const toggleModalTheme = () => {
    setShowModalTheme((prev) => !prev);
  };

  const toggleModalLang = () => {
    setShowModalLang((prev) => !prev);
  };

  const toggleModalColors = () => {
    setShowModalColors((prev) => !prev);
  };

  return (
    <section className="flex flex-col w-full h-full bg-white dark:bg-dark-third">
      <Profile />
      <ul className="flex flex-col">
        <ItemMenuSetting duration={0.4} onClick={toggleModalTheme}>
          <MdInvertColors size={22} className="text-gray-400" />
          <span>Theme</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={0.7} onClick={toggleModalColors}>
          <MdColorLens size={22} className="text-gray-400" />
          <span>Accent color</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1} onClick={toggleModalLang}>
          <MdLanguage size={22} className="text-gray-400" />
          <span>Language</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1.3} onClick={() => navigate('/security')}>
          <MdSecurity size={22} className="text-gray-400" />
          <span>Security</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1.6} onClick={() => navigate('/about')}>
          <MdOutlineHelp size={22} className="text-gray-400" />
          <span>About</span>
        </ItemMenuSetting>
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
