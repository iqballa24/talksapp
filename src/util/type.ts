import { IconType } from 'react-icons/lib';

export type MenuProfileTypes = {
  id: number;
  name: string;
  path: string;
};

export type ButtonsTypes = {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  title: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
};

export type ItemMenuSettingTypes = {
  children: React.ReactNode;
  duration: number;
  onClick: () => void;
};

export type featuredSecurityTypes = {
  id: number;
  icon: IconType;
  text: string;
};

export type securityContentTypes = {
  title: string;
  description: string;
  featured: featuredSecurityTypes[];
  content: string;
};

export type contactsTypes = {
  id: string;
  icon: IconType;
  contact: string;
  tooltip: string;
  link: string;
};

export type aboutContentTypes = {
  logo: string;
  version: string;
  content: string;
  contactList: contactsTypes[];
};

export type aboutPage = {
  en: aboutContentTypes;
};
