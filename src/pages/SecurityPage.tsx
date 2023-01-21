import React from 'react';
import { motion } from 'framer-motion';
import { HiLockOpen } from 'react-icons/hi';
import { Header } from '@/components/UI';
import { securityPageContent } from '@/constant';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';

const SecurityPage = () => {
  const { accentColor, language } = useAppSelector((state) => state.ui);

  const nameHeader = language === 'en' ? 'Security' : 'Keamanan';
  const bgColor = configColors[accentColor as keyof typeof configColors].bgColor[50];
  const content = securityPageContent[language as keyof typeof securityPageContent];

  return (
    <>
      <Header name={nameHeader} pathBack="/settings" />
      <motion.section
        initial={{ y: 70 }}
        animate={{ y: 0 }}
        className="flex flex-col space-y-5 py-5 px-5 sm:px-7 overflow-y-scroll"
      >
        <div className="flex justify-center py-5">
          <div
            className={`flex justify-center items-center ${bgColor} h-[84px] w-[84px] rounded-[50%]`}
          >
            <HiLockOpen size={46} className="text-white" />
          </div>
        </div>
        <h1 className="text-lg text-dark dark:text-grey font-medium select-none">
          {content.title}
        </h1>
        <p className="text-sm text-dark-secondary dark:text-grey/50 leading-6">
          {content.description}
        </p>
        <ul className="flex flex-col space-y-3">
          {content.featured.map((feature) => (
            <li
              key={feature.id}
              className="flex flex-row space-x-2 items-center text-dark-secondary dark:text-grey/50"
            >
              <feature.icon size={22} />
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
        <div
          className="text-sm text-dark-secondary dark:text-grey/50 leading-6"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </motion.section>
    </>
  );
};

export default React.memo(SecurityPage);
