import React from 'react';

const FeedArticle = (props) => {
  const title = props.title;
  const link = props.link;
  const source = props.source;


  return (
    <div className='w-full p-4 bg-grey my-4 rounded-lg'>
      <a href={link}>
        <h3 className='bg-grey'>{title}</h3> | <span className='text-main'>{source}</span>
      </a>
    </div>
  );
};

export default FeedArticle;
