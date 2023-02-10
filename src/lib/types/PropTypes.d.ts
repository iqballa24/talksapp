import { MenuProfileTypes, userTypes } from '@/lib/types';
import { DocumentData, Timestamp } from 'firebase/firestore';

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
  isDanger?: boolean;
  isFull?: boolean;
  onClick: () => void;
};

export type ModalProps = {
  onClose: () => void;
  isShow: boolean;
  children?: React.ReactNode;
};

export type HeaderProps = { pathBack: string; name: string };

export type PopoverProps = {
  className: string;
  menus: MenuProfileTypes[];
};

export type NewFriendsItemProps = {
  userInfo: userTypes;
  status: string;
  requestBy?: string;
  onAdd?: (uid: string) => void;
  onAccept?: ({ uid, displayName, photoURL }: DocumentData) => void;
  onChat?: ({ uid, displayName, photoURL }: DocumentData) => void;
  onReject?: (uid: string) => void;
};

export type ProfileProps = {
  displayName: string;
  about: string;
  photoURL: string;
};

export type ChatItemProps = {
  chatId: string;
  lastMessage: string;
  status: string;
  userInfo: userTypes;
  time: Timestamp;
};

export type MessageItemProps = {
  sender: boolean;
  text: string;
  time: string;
  img?: string;
  name?: string;
};

export type GroupsItemProps = {
  chatId: string;
  groupInfo: groupInfoTypes;
  lastMessage: string;
  time: Timestamp;
};
