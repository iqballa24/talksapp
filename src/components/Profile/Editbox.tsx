import React, { useState } from 'react';
import { MdEdit, MdDone } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const Editbox: React.FC<{
  title: string;
  value: string;
  onChange: (e: string) => void;
}> = ({ title, value, onChange }) => {
  const [isEdit, setIsEdit] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const editInputToggler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="flex flex-col px-4 sm:px-7 py-3 space-y-3 bg-white dark:bg-dark-third shadow-sm">
      <h1 className="text-sm text-primary">{title}</h1>
      <div className="flex flex-row items-center justify-between">
        <span className="text-dark dark:text-grey text-[17px] w-full pr-4">
          <input
            type="text"
            value={value}
            onChange={changeHandler}
            className={`w-full py-1 bg-transparent outline-none ${isEdit && 'border-b border-primary'}`}
            disabled={!isEdit}
          />
        </span>
        {isEdit ? (
          <>
            <MdDone
              id="done"
              size={22}
              className="text-gray-400 cursor-pointer"
              onClick={editInputToggler}
            />
            <Tooltip className="z-20" anchorId="done" content="Click to save" place='right' />
          </>
        ) : (
          <>
            <MdEdit
              id="edit"
              size={22}
              className="text-gray-400 cursor-pointer"
              onClick={editInputToggler}
            />
            <Tooltip className="z-20" anchorId="edit" content="Click to edit" place='right'/>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Editbox);
