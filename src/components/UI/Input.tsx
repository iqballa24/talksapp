import React from 'react';

const Input = () => {
  return (
    <div className="relative pl-5 pr-4 py-2 rounded-lg w-full bg-white text-dark-secondary">
      <input
        type="text"
        placeholder="Type a message"
        className="bg-transparent w-full outline-none text-base"
      />
    </div>
  );
};

export default React.memo(Input);
