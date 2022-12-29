import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { Header } from '@/components/UI';
import { aboutPageContent } from '@/constant';

const AboutPage = () => {
  return (
    <>
      <Header name="About" pathBack="/settings" />
      <motion.section
        initial={{ y: 70 }}
        animate={{ y: 0 }}
        className="flex flex-col space-y-5 py-5 px-5 sm:px-7 overflow-scroll select-none"
      >
        <div className="flex flex-col items-center space-y-2 py-5">
          <img
            src={aboutPageContent.en.logo}
            alt="Logo talksapp"
            className="w-[180px] h-[180px]"
            loading="lazy"
          />
          <span className="text-dark-secondary text-xs">
            {aboutPageContent.en.version}
          </span>
        </div>
        <div
          className="text-dark-secondary text-sm leading-6"
          dangerouslySetInnerHTML={{ __html: aboutPageContent.en.content }}
        />
        <ul className="flex flex-col space-y-3 text-dark-secondary text-sm">
          {aboutPageContent.en.contactList.map((contact) => (
            <li
              key={contact.id}
              className="flex flex-row space-x-2 items-center"
            >
              <contact.icon size={18} />
              <a
                id={`${contact.id}-link`}
                href={contact.link}
                target="_blank"
                rel="noreferrer"
              >
                {contact.contact}
              </a>
              <Tooltip
                className="z-30"
                anchorId={`${contact.id}-link`}
                content={contact.tooltip}
                place="right"
              />
            </li>
          ))}
        </ul>
      </motion.section>
    </>
  );
};

export default AboutPage;
