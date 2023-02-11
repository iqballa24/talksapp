import React, { useEffect } from 'react';
import { Header } from '@/components/UI';
import { configColors } from '@/constant/configColors';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { MdAdd } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import GroupsList from '@/components/Groups/GroupsList';
import { asyncGetDetailMember } from '@/store/groups/action';

const GroupsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ui, group } = useAppSelector((state) => state);
  const { selectedGroup } = group;
  const { accentColor, language } = ui;
  const afterBgColor =
    configColors[accentColor as keyof typeof configColors].button;

  useEffect(() => {
    if (selectedGroup.idGroup) {
      dispatch(asyncGetDetailMember(selectedGroup.member));
    }
  }, [selectedGroup.idGroup]);

  return (
    <>
      <Header name="Groups" pathBack="/" />
      <div className="relative w-full h-full">
        <div
          id="group"
          className={`absolute bottom-8 right-10 ${afterBgColor} p-3 w-fit rounded-[50%] cursor-pointer transition`}
          onClick={() => navigate('/create-group')}
        >
          <MdAdd size={28} color="white" />
        </div>
        <Tooltip
          className="z-20"
          anchorId="group"
          content={language === 'en' ? 'Create groups' : 'Buat grup'}
        />
        <GroupsList />
      </div>
    </>
  );
};

export default GroupsPage;
