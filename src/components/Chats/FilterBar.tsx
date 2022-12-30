import React from 'react';
import { MdFilterList } from 'react-icons/md';
import { Searchbar } from '@/components/UI';

const FilterBar = () => {
  return (
    <div className="flex flex-row items-center px-4 py-2 space-x-4 bg-white dark:bg-dark-third">
      <Searchbar />
      <div className="text-gray-400 cursor-pointer" role="button">
        <MdFilterList size={26} />
      </div>
    </div>
  );
};

export default React.memo(FilterBar);
