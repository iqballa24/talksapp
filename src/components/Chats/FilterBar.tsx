import React, { useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { Searchbar } from '@/components/UI';

const FilterBar = () => {
  const [searchVal, setSearchVal] = useState<string>('');

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchVal(target.value);
  };
  return (
    <React.Fragment>
      <div className="flex flex-row items-center px-4 py-2 space-x-4 bg-white dark:bg-dark-third">
        <Searchbar onSearch={onSearch} placeholder="Search chat" />
        <div className="text-gray-400 cursor-pointer" role="button">
          <MdFilterList size={26} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(FilterBar);
