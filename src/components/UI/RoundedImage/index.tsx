import React from 'react';

const RoundedImage: React.FC<{ src: string; className?: string }> = ({
  src,
  className,
}) => {
  const classes = ['rounded-[50%] w-[200px] h-[200px] z-0'];
  className && classes.push(className);

  return (
    <img src={src} className={classes.join(' ')} alt="profile picture"></img>
  );
};

export default RoundedImage;
