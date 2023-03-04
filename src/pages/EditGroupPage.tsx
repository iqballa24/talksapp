import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Buttons, Header } from '@/components/UI';
import { EditAvatar, Editbox } from '@/components/Profile';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import useWindowSize from '@/lib/hooks/useWindowSize';
import { asyncUpdateGroup, asyncUpdateImageGroup } from '@/store/groups/action';

const EditGroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ui, group } = useAppSelector((state) => state);
  const { selectedGroup } = group;

  const titlePage =
    ui.language === 'en' ? "Setting's group" : 'Pengaturan group';

  const size = useWindowSize();
  const pathBack =
    size.width > 560 ? '/groups' : `/message/${selectedGroup.idGroup}`;

  const [subject, setSubject] = useState<string>(selectedGroup.subject);
  const [description, setDescription] = useState<string>(
    selectedGroup.description
  );
  const [img, setImg] = useState<string>(
    `https://ui-avatars.com/api/?name=${selectedGroup.subject}&background=09A683&color=fff`
  );

  const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    dispatch(
      asyncUpdateImageGroup({
        id: selectedGroup.idGroup,
        subject: selectedGroup.subject,
        file,
      })
    );
  };

  const subjectChangeHandler = (subject: string) => {
    setSubject(subject);
  };

  const descriptionChangeHandler = (description: string) => {
    setDescription(description);
  };

  const onSaveHandler = () => {
    dispatch(asyncUpdateGroup(selectedGroup.idGroup, { subject, description }));
  };

  useEffect(() => {
    if (selectedGroup.idGroup === '') {
      navigate('/groups');
    }

    setImg(selectedGroup.photoURL);
  }, [selectedGroup.photoURL]);

  return (
    <>
      <Header name={titlePage} pathBack={pathBack} />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-grey-secondary dark:bg-dark-third h-full"
      >
        <EditAvatar img={img} onImgChange={imgChangeHandler} />
        <div className="flex flex-col justify-between h-full pb-6">
          <div className="flex flex-col">
            <Editbox
              title="Subject"
              value={subject}
              onChange={subjectChangeHandler}
              onSave={onSaveHandler}
            />
            <Editbox
              title="Description"
              value={description}
              onChange={descriptionChangeHandler}
              onSave={onSaveHandler}
            />
          </div>
          <div className="px-4 sm:px-7 mt-10">
            <Buttons
              type="button"
              title="delete group"
              isDanger
              isDisabled
              isFull
              onClick={() => console.log()}
            >
              Delete group
            </Buttons>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default EditGroupPage;
