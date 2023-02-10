import { IconType } from 'react-icons/lib';

export type FormLoginTypes = {
  email: string;
  password: string;
};

export type registerTypes = {
  username: string;
  email: string;
  password: string;
};

export type userTypes = {
  uid: string;
  displayName: string;
  photoURL: string;
  about: string;
  email: string;
};

export type groupInfoTypes = {
  idGroup: string;
  subject: string;
  description: string;
  createdBy: string;
  createdAt: number;
  member: string[];
  photoURL: string;
};

export type messageTypes = {
  date: string;
  id: string;
  senderId: string;
  text: string;
};

export interface FormRegisterTypes extends registerTypes {
  confirmPassword: string;
}

export type MenuProfileTypes = {
  id: number;
  name: { en: string; id: string };
  path: string;
};

export type featuredSecurityTypes = {
  id: number;
  icon: IconType;
  text: string;
};

export type securityContentTypes = {
  en: {
    title: string;
    description: string;
    featured: featuredSecurityTypes[];
    content: string;
  };
  id: {
    title: string;
    description: string;
    featured: featuredSecurityTypes[];
    content: string;
  };
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
  id: aboutContentTypes;
};

export type colorsTypes = {
  default: string;
  25: string;
  50: string;
  100: string;
};

export type listFriendsTypes = {
  requestBy: string;
  status: string;
  userId: string;
  userInfo: userTypes;
};

export type configColorsTypes = {
  primary: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  orange: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  merigold: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  yellow: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  softblue: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  blue: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  red: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  pink: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  purple: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
  brown: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
    borderInput: string;
  };
};
