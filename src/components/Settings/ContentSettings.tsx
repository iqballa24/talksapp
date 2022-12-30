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
  const { showModalColors, showModalLang, showModalTheme } = useAppSelector(
    (state) => state.ui
  );

  const toggleModalTheme = () => {
    dispatch(uiActions.toggleModalTheme());
  };

  const toggleModalLang = () => {
    dispatch(uiActions.toggleModalLang());
  };

  const toggleModalColors = () => {
    dispatch(uiActions.toggleModalColors());
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
