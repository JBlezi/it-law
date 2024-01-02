import React from 'react';
import closingXWhite from './images/closingX-white.svg'

const Toast = ({ message, showToast, closeToast }) => {
  if (!showToast) return null;

  return (
    <div className="fixed top-0 left-2 w-[96%] bg-main py-4 px-4 my-2 rounded-lg text-xl">
      <div className='flex justify-between'>
        <div className='text-light'>{message}</div>
        <button onClick={closeToast}><img src={closingXWhite} alt="" className="h-4 w-4"/></button>
      </div>
    </div>
  );
};

export default Toast;
