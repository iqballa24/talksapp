import React from 'react';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';
import '@/styles/Chatbubble.scss';

const MessageItem: React.FC<{ sender: boolean }> = ({ sender }) => {
  const { accentColor } = useAppSelector((state) => state.ui);

  const selectedColor = configColors[accentColor as keyof typeof configColors];
  const bgColor = selectedColor.bgChatBubble;
  const triangleBorder = selectedColor.borderTriangle;

  return (
    <div className={`msgBubble ${sender && 'sender'}`}>
      <div className={`msgContent ${sender && bgColor}`}>
        <p>Hello, how are you?</p>
        <time>4:42pm</time>
        <div className={`triangle ${sender && triangleBorder}`}></div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
