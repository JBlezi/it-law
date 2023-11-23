import React from 'react';
import Button from './button';

const Article = (props) => {
  const image = props.image;
  const header = props.header;
  const authors = props.authors;
  const date = props.date;
  const reading_time = props.reading_time;
  const content = props.content;


  return (
    <div className='mx-8 text-grey my-16'>
      <h2 className='text-2xl font-bold mb-4'>{header}</h2>
      <img src={image} alt="" className='aspect-video object-cover mb-4'/>
      <h3 className='text-xl font-medium mb-4'>by <span className='underline'>{authors[0]},</span> <span className='underline'>{authors[1]}</span>| {date} | {reading_time} min read</h3>
      <p className='text-2xl font-medium mb-8 line-clamp-3'>{content}</p>
      <Button color='grey' link='/home' text='READ MORE'/>
    </div>
  );
};

export default Article;
