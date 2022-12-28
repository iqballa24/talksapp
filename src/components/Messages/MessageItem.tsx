import React from 'react';
import '@/styles/Chatbubble.scss';

const MessageItem: React.FC<{ sender: boolean }> = ({ sender }) => {
  return (
    <div className={`msgBubble ${sender && 'sender'}`}>
      <div className="msgContent">
        <p>Hello, how are you?</p>
        <time>4:42pm</time>
        <div className="triangle"></div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
