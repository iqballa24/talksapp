import { MenuProfileTypes } from '@/lib/types';

export type InputProps = {
  id: string;
  name: string;
  placeholder: string;
};

export type EditBoxProps = {
  title: string;
  value: string;
  onChange: (e: string) => void;
};

export type EditAvatarProps = {
  img: string;
  onImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ItemSettingProps = {
  children: React.ReactNode;
  duration: number;
  onClick: () => void;
};

export type ButtonsProps = {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  title: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
};

export type ModalSettingProps = {
  onClose: () => void;
  isShow: boolean;
};

export type HeaderProps = { pathBack: string; name: string };

export type PopoverProps = {
  className: string;
  menus: MenuProfileTypes[];
};
