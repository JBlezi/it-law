import React from 'react';

const Social = (props) => {
  const image = props.image;
  const title = props.title;
  const link = props.link;


  return (
    <div className='text-grey my-16 xl:my-8 mx-8 xl:mx-4'>
      <a href={link} target='_blank' rel='noreferrer'>
        <div className='p-4 md:p-6 lg:p-8 xl:p-2 rounded-lg bg-white'>
          <img src={image} alt={title} className=' object-cover'/>
        </div>
      </a>
    </div>
  );
};

export default Social;
