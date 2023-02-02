import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';
import { MessageItemProps } from '@/lib/types/PropTypes';
import { formatedDate } from '@/utils/formatedDate';
import '@/styles/Chatbubble.scss';

const MessageItem: React.FC<MessageItemProps> = ({ sender, text, time }) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const selectedColor = configColors[accentColor as keyof typeof configColors];
  const bgColor = selectedColor.bgChatBubble;
  const triangleBorder = selectedColor.borderTriangle;
  const ref = useRef<null | HTMLDivElement>(null);
  const date = formatedDate(time);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [text]);

  return (
    <div ref={ref} className={`msgBubble ${sender && 'sender'}`}>
      <div className={`msgContent ${sender && bgColor}`}>
        <p>{text}</p>
        <time>{date}</time>
        <div className={`triangle ${sender && triangleBorder}`}></div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
