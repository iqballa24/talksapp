import React from 'react';

import MessageItem from '@/components/Messages/MessageItem';

const Messages = () => {
  return (
    <div className="bg-chat w-full h-full overflow-scroll px-14 pt-3">
      <MessageItem sender={true}/>
      <MessageItem sender={false}/>
      <MessageItem sender={false}/>
      <MessageItem sender={true}/>
      <MessageItem sender={false}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
      <MessageItem sender={true}/>
    </div>
  );
};

export default React.memo(Messages);
