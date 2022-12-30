import React from 'react';

const WrapperPage: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col bg-white dark:bg-dark-third">
      {children}
    </div>
  );
};

export default React.memo(WrapperPage);
