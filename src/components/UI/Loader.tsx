import React from 'react';
import ReactDOM from 'react-dom';
import classes from '@/styles/Loader.module.scss';

const portalElement = document.getElementById('overlays') as HTMLElement;

const Loader = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 z-50">
          <div className={classes.loader}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
          </div>
        </div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Loader;
