import React, { useState } from 'react';
import { ModalSettingTheme } from '@/components/UI';
import { Profile, ItemMenuSetting } from '@/components/Settings';
import {
  MdColorLens,
  MdInvertColors,
  MdOutlineHelp,
  MdLanguage,
  MdSecurity,
} from 'react-icons/md';

const ContentSettings = () => {
  const [showModalTheme, setShowModalTheme] = useState(false);

  const toggleModalTheme = () => {
    setShowModalTheme((prev) => !prev);
  };

  return (
    <section className="flex flex-col w-full h-full">
      <Profile />
      <ul className="flex flex-col">
        <ItemMenuSetting duration={0.4} onClick={toggleModalTheme}>
          <MdInvertColors size={22} className="text-gray-400" />
          <span>Theme</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={0.7} onClick={toggleModalTheme}>
          <MdColorLens size={22} className="text-gray-400" />
          <span>Accent color</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1} onClick={toggleModalTheme}>
          <MdLanguage size={22} className="text-gray-400" />
          <span>Language</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1.3} onClick={toggleModalTheme}>
          <MdSecurity size={22} className="text-gray-400" />
          <span>Security</span>
        </ItemMenuSetting>
        <ItemMenuSetting duration={1.6} onClick={toggleModalTheme}>
          <MdOutlineHelp size={22} className="text-gray-400" />
          <span>Help</span>
        </ItemMenuSetting>
      </ul>
      <ModalSettingTheme onClose={toggleModalTheme} isShow={showModalTheme} />
    </section>
  );
};

export default React.memo(ContentSettings);
