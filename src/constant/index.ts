import { MenuProfileTypes, securityContentTypes, aboutPage } from '@/lib/types';
import {
  HiOutlineChatAlt2,
  HiOutlinePhone,
  HiPaperClip,
  HiOutlineLocationMarker,
  HiOutlineStatusOnline,
} from 'react-icons/hi';
import { AiOutlineGoogle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Logo from '@/images/logo.svg';

const menuProfile: MenuProfileTypes[] = [
  {
    id: 1,
    name: 'Settings',
    path: '/settings',
  },
  {
    id: 2,
    name: 'Profile',
    path: '/profile',
  },
  {
    id: 3,
    name: 'Log out',
    path: '/logout',
  },
];

const securityPageContent: securityContentTypes = {
  title: 'Your chats aren`t private',
  description:
    'End-to-end encryption keeps your personal messages and calls between you and the people you choose. Not even WhatsApp can read or listen to them. This includes your:',
  featured: [
    {
      id: 1,
      icon: HiOutlineChatAlt2,
      text: 'Text and voice messages',
    },
    {
      id: 2,
      icon: HiOutlinePhone,
      text: 'Audio and video calls',
    },
    {
      id: 3,
      icon: HiPaperClip,
      text: 'Photos, videos and documents',
    },
    {
      id: 4,
      icon: HiOutlineLocationMarker,
      text: 'Location sharing',
    },
    {
      id: 5,
      icon: HiOutlineStatusOnline,
      text: 'Status updates',
    },
  ],
  content: `<p>Yupp, those are the benefits will you get if you are using WhatsApp Web &#128513;. TalksApp web does not secure your chats and not using End-to-end encryption for keeps your personal messages. TalksApp web is just for a personal project and not used for commercialization</p>`,
};

const aboutPageContent: aboutPage = {
  en: {
    logo: Logo,
    version: 'Version 1.0',
    content: `<p>TalksApp is a web that can be used to send messages and stay in touch with friends and family, anytime and anywhere. The user interface TalksApp is similar to WhatsApp, but not all WhatsApp features are in TalksApp. It is only used for personal projects and not for commercial purposes.</p><br/><p>If you have any questions or interest in working with me, you can contact me contact the below:</p>`,
    contactList: [
      {
        id: 'email',
        icon: AiOutlineGoogle,
        contact: 'iqbalnugraha347@gmail.com',
        tooltip: 'Send email',
        link: 'mailto:iqbalnugraha347@gmail.com',
      },
      {
        id: 'linkedin',
        icon: AiFillLinkedin,
        contact: 'tiqbalnugraha',
        tooltip: 'Open Linkedin',
        link: 'https://www.linkedin.com/in/tiqbalnugraha/',
      },
      {
        id: 'github',
        icon: AiFillGithub,
        contact: 'iqballa24',
        tooltip: 'Open github',
        link: 'https://github.com/iqballa24',
      },
    ],
  },
};

const colors: string[] = [
  '#008069',
  '#FF6900',
  '#FCB900',
  '#ffeb3b',
  '#8ED1FC',
  '#0693E3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
  '#795548',
];

export { menuProfile, securityPageContent, colors, aboutPageContent };
