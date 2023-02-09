import React from 'react';
import { Header } from '@/components/UI';
import { configColors } from '@/constant/configColors';
import { useAppSelector } from '@/lib/hooks/useRedux';
import { MdAdd } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import GroupsList from '@/components/Groups/GroupsList';

const GroupsPage = () => {
  const navigate = useNavigate();
  const { ui } = useAppSelector((state) => state);
  const { accentColor, language } = ui;
  const afterBgColor =
    configColors[accentColor as keyof typeof configColors].button;

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
          content={language === 'en' ? 'Create groups' : 'Buat group'}
        />
        <GroupsList />
      </div>
    </>
  );
};

export default GroupsPage;
