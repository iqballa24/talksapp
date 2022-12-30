import React from 'react';
import { MdSearch } from 'react-icons/md';

const Searchbar = () => {
  return (
    <div className="relative pl-14 pr-4 py-2 text-dark-secondary dark:text-grey bg-grey-secondary dark:bg-dark rounded-lg w-full">
      <input
        type="text"
        placeholder="Search or start new chat"
        className="bg-transparent w-full outline-none text-sm"
      />
      <div className="absolute top-[10px] left-[14px]">
        <MdSearch size={20}/>
      </div>
    </div>
  );
};

export default React.memo(Searchbar);
