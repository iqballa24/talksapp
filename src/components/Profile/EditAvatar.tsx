import React from 'react';
import { MdInsertPhoto } from 'react-icons/md';
import { EditAvatarProps } from '@/lib/types/PropTypes';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { RoundedImage } from '@/components/UI';

const EditAvatar: React.FC<EditAvatarProps> = ({ img, onImgChange }) => {
  const { language } = useAppSelector((state) => state.ui);
  return (
    <div className="w-full py-7 flex justify-center transition-all relative">
      <label
        htmlFor="file"
        className="flex flex-col space-y-2 justify-center items-center rounded-[50%] w-[200px] h-[200px] border cursor-pointer z-20 opacity-0 hover:opacity-100 hover:bg-dark/50"
      >
        <MdInsertPhoto size={26} color="white" />
        <span className="text-white text-xs text-center">
          {language === 'en' ? `CHANGE PROFILE PICTURE` : `GANTI GAMBAR PROFIL`}
        </span>
      </label>
      <input id="file" type="file" className="hidden" onChange={onImgChange} accept="image/png, image/gif, image/jpeg"/>
      <RoundedImage src={img} className="absolute" />
    </div>
  );
};

export default EditAvatar;
