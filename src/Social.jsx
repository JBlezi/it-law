import React from 'react';

const Social = (props) => {
  const image = props.image;
  const title = props.title;
  const link = props.link;


  return (
    <div className='text-grey my-16 mx-8'>
      <a href={link} target='_blank' rel='noreferrer'>
        <div className='p-4 md:p-6 lg:p-8 rounded-lg bg-light dark:bg-light'>
          <img src={image} alt={title} className=' object-cover'/>
        </div>
      </a>
    </div>
  );
};

export default Social;
