import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';
import { MessageItemProps } from '@/lib/types/PropTypes';
import '@/styles/Chatbubble.scss';

const MessageItem: React.FC<MessageItemProps> = ({
  sender,
  text,
  time,
  img,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const selectedColor = configColors[accentColor as keyof typeof configColors];
  const bgColor = selectedColor.bgChatBubble;
  const triangleBorder = selectedColor.borderTriangle;
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [text]);

  return (
    <React.Fragment>
      {img && (
        <div ref={ref} className={`msgBubble ${sender && 'sender'}`}>
          <div className={`msgContent ${sender && bgColor}`}>
            <img src={img} alt="" className="max-w-[280px] p-1" />
            <div className={`triangle ${sender && triangleBorder}`}></div>
          </div>
        </div>
      )}
      {text !== '' && (
        <div ref={ref} className={`msgBubble ${sender && 'sender'}`}>
          <div className={`msgContent ${sender && bgColor}`}>
            <p>{text}</p>
            <time>{time}</time>
            <div className={`triangle ${sender && triangleBorder}`}></div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(MessageItem);
