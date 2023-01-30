import React, { useState } from 'react';
import { MdEdit, MdDone } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { configColors } from '@/constant/configColors';
import { EditBoxProps } from '@/lib/types/PropTypes';

const Editbox: React.FC<EditBoxProps> = ({
  title,
  value,
  onChange,
  onSave,
}) => {
  const { accentColor } = useAppSelector((state) => state.ui);
  const selectedColor = configColors[accentColor as keyof typeof configColors];
  const textColor = selectedColor.textColor.default;
  const borderBInput = selectedColor.borderInput;

  const [isEdit, setIsEdit] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const editInputToggler = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickSave = () => {
    editInputToggler();
    onSave()
  };

  return (
    <div className="flex flex-col px-4 sm:px-7 py-3 space-y-3 bg-white dark:bg-dark-third shadow-sm">
      <h1 className={`text-sm ${textColor}`}>{title}</h1>
      <div className="flex flex-row items-center justify-between">
        <span className="text-dark dark:text-grey text-[17px] w-full pr-4">
          <input
            type="text"
            value={value}
            onChange={changeHandler}
            className={`w-full py-1 bg-transparent outline-none ${
              isEdit && borderBInput
            }`}
            disabled={!isEdit}
          />
        </span>
        {isEdit ? (
          <>
            <MdDone
              id={`${title}-edit`}
              size={22}
              className="text-gray-400 cursor-pointer"
              onClick={onClickSave}
            />
            <Tooltip
              className="z-20"
              anchorId={`${title}-edit`}
              content="Click to save"
              place="right"
            />
          </>
        ) : (
          <>
            <MdEdit
              id={`${title}-done`}
              size={22}
              className="text-gray-400 cursor-pointer"
              onClick={editInputToggler}
            />
            <Tooltip
              className="z-20"
              anchorId={`${title}-done`}
              content="Click to edit"
              place="right"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Editbox);
