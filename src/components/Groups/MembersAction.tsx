import { userTypes } from '@/lib/types';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

const MembersAction: React.FC<{
  members: userTypes[];
  onClickMember: ({
    uid,
    displayName,
    email,
    about,
    photoURL,
  }: userTypes) => void;
  onClickAddMember: () => void;
}> = ({ members, onClickMember, onClickAddMember }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center px-4 sm:px-7 py-5">
      {members.map((member) => {
        const { uid, displayName, email, about, photoURL } = member;
        return (
          <div className="w-[49px]" key={uid}>
            <img
              id={displayName}
              src={
                photoURL !== ''
                  ? photoURL
                  : `https://ui-avatars.com/api/?name=${displayName}`
              }
              className="rounded-[50%] w-[49px] h-[49px] object-cover cursor-pointer hover:-translate-y-2 transition ease-out duration-300"
              onClick={() =>
                onClickMember({
                  uid,
                  displayName,
                  email,
                  about,
                  photoURL,
                })
              }
              alt=""
            />
            <Tooltip
              className="z-30"
              anchorId={displayName}
              content={displayName}
              place="bottom"
            />
          </div>
        );
      })}
      <MdAdd
        size={22}
        className="text-dark-secondary dark:text-white hover:text-dark hover:dark:text-gray-300 cursor-pointer transition"
        onClick={onClickAddMember}
      />
    </div>
  );
};

export default MembersAction;
