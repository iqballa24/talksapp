import React from 'react';

import { MdOutlineEmojiEmotions, MdMic } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { Input } from '@/components/UI';

const FooterMessages = () => {
  return (
    <div className="flex flex-row px-4 py-1 justify-between min-h-[62px] items-center text-dark-secondary bg-grey-secondary space-x-5">
      <MdOutlineEmojiEmotions size={30} />
      <FiPaperclip size={24} />
      <Input />
      <MdMic size={30} />
    </div>
  );
};

export default React.memo(FooterMessages);
