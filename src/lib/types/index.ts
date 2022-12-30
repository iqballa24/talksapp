import { IconType } from 'react-icons/lib';

export type MenuProfileTypes = {
  id: number;
  name: string;
  path: string;
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

export type colorsTypes = {
  default: string;
  25: string;
  50: string;
  100: string;
};

export type configColorsTypes = {
  primary: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  orange: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  merigold: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  yellow: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  softblue: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  blue: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  red: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  pink: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  purple: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
  brown: {
    bgColor: colorsTypes;
    textColor: colorsTypes;
    button: string;
    bgLayout: string;
    bgChatBubble: string;
    borderTriangle: string;
  };
};
