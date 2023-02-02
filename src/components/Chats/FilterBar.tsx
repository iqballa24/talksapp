import React from 'react';
import { MdFilterList } from 'react-icons/md';
import { Searchbar } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { chatsSliceAction } from '@/store/chats';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(chatsSliceAction.changeFilterChat(target.value));
  };
  return (
    <React.Fragment>
      <div className="flex flex-row items-center px-4 py-2 space-x-4 bg-white dark:bg-dark-third">
        <Searchbar
          onSearch={onSearch}
          placeholder={`${
            language === 'en' ? 'Search chats' : 'Cari percakapan'
          }`}
        />
        <div className="text-gray-400 cursor-pointer" role="button">
          <MdFilterList size={26} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(FilterBar);
