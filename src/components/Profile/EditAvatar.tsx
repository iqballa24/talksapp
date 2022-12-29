import React from 'react';
import { MdInsertPhoto } from 'react-icons/md';

const EditAvatar: React.FC<{
  img: string;
  onImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ img, onImgChange }) => {
  return (
    <div className="w-full py-7 flex justify-center transition-all relative">
      <label
        htmlFor="file"
        className="flex flex-col space-y-2 justify-center items-center rounded-[50%] w-[200px] h-[200px] border cursor-pointer z-20 opacity-0 hover:opacity-100 hover:bg-dark/50"
      >
        <MdInsertPhoto size={26} color="white" />
        <span className="text-white text-xs text-center">
          CHANGE <br />
          PROFILE PHOTO
        </span>
      </label>
      <input id="file" type="file" className="hidden" onChange={onImgChange} />
      <img
        src={img}
        alt="profile picture"
        className="absolute rounded-[50%] w-[200px] h-[200px] z-0"
      />
    </div>
  );
};

export default EditAvatar;
