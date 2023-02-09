import { EditAvatar, Editbox } from '@/components/Profile';
import { Buttons, Header } from '@/components/UI';
import { useAppDispatch } from '@/lib/hooks/useRedux';
import { asyncCreateNewGroup } from '@/store/groups/action';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const CreateGroupPage = () => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string>(
    'https://ui-avatars.com/api/?name=group&background=09A683&color=fff'
  );
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('-');
  const [description, setDescription] = useState<string>('-');

  const imgChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const imgUrl: string = reader.result as string;
      setImg(imgUrl);
    };
    reader.readAsDataURL(file);
    setUploadImage(e.target.files[0]);
  };

  const subjectChangeHandler = (subject: string) => {
    setSubject(subject);
  };

  const descriptionChangeHandler = (desc: string) => {
    setDescription(desc);
  };

  const submitHandler = () => {
    dispatch(asyncCreateNewGroup({ photo: uploadImage, subject, description }));
  };

  return (
    <>
      <Header name="New Group" pathBack="/groups" />
      <motion.section
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          default: { ease: 'linear' },
        }}
        className="flex flex-col bg-grey-secondary dark:bg-dark-third h-full"
      >
        <EditAvatar img={img} onImgChange={imgChangeHandler} />
        <Editbox
          title={'Group Subject'}
          value={subject}
          onChange={subjectChangeHandler}
          onSave={() => console.log()}
        />
        <Editbox
          title={'Description'}
          value={description}
          onChange={descriptionChangeHandler}
          onSave={() => console.log()}
        />
        <div className="h-full w-full flex items-end p-5">
          <Buttons
            title="create-group"
            type="button"
            isPrimary
            isFull
            onClick={submitHandler}
          >
            Create Group
          </Buttons>
        </div>
      </motion.section>
    </>
  );
};

export default CreateGroupPage;
