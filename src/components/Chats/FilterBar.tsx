import React from 'react';
import { MdFilterList } from 'react-icons/md';
import { Searchbar } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { chatsSliceAction } from '@/store/chats';
import { Tooltip } from 'react-tooltip';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { language, accentColor } = useAppSelector((state) => state.ui);
  const { isSort } = useAppSelector((state) => state.chats);

  const onSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(chatsSliceAction.changeFilterChat(target.value));
  };

  const toggleSortHandler = () => {
    dispatch(chatsSliceAction.toggleSortChat());
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
        <button
          type="button"
          className="cursor-pointer"
          onClick={toggleSortHandler}
        >
          <MdFilterList
            id="sort"
            size={24}
            className={
              isSort ? `text-${accentColor} opacity-80` : 'text-gray-400'
            }
          />
          <Tooltip
            className="z-20"
            anchorId="sort"
            content={
              language === 'en' ? 'Sort by name' : 'Urutkan berdasarkan nama'
            }
            place="bottom"
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default React.memo(FilterBar);
