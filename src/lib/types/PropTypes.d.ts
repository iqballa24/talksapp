import { MenuProfileTypes, userTypes } from '@/lib/types';
import { DocumentData } from 'firebase/firestore';

export type InputProps = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  enterHandler: () => void;
};

export type EditBoxProps = {
  title: string;
  value: string;
  onSave: () => void;
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

export type ModalProps = {
  onClose: () => void;
  isShow: boolean;
};

export type HeaderProps = { pathBack: string; name: string };

export type PopoverProps = {
  className: string;
  menus: MenuProfileTypes[];
};

export type NewFriendsItemProps = {
  uid: string;
  name: string;
  email: string;
  image: string;
  onClick: ({ uid, displayName, photoURL }: DocumentData) => void;
  isFriends: boolean;
};

export type ProfileProps = {
  displayName: string;
  about: string;
  photoURL: string;
};

export type ChatItemProps = {
  chatId: string;
  uid: string;
  displayName: string;
  lastMessage: string;
  photoURL: string;
  time: any;
};

export type MessageItemProps = {
  sender: boolean;
  text: string;
  time: any;
};
