import { EditAvatar, Editbox } from '@/components/Profile';
import { Buttons, Header } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/useRedux';
import { asyncCreateNewGroup } from '@/store/groups/action';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const { language } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string>(
    'https://ui-avatars.com/api/?name=group&background=09A683&color=fff'
  );
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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

  const submitHandler = async () => {
    try {
      const res = await dispatch(
        asyncCreateNewGroup({ photo: uploadImage, subject, description })
      );

      if (res) return navigate('/groups');
    } catch (err) {
      console.log(err);
    }
  };

  const titlePage = language === 'en' ? 'Create new Group' : 'Buat grup baru';

  return (
    <>
      <Header name={titlePage} pathBack="/groups" />
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
          title={'Subject'}
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
            {titlePage}
          </Buttons>
        </div>
      </motion.section>
    </>
  );
};

export default CreateGroupPage;
