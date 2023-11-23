import React from 'react';
import Button from './button';

const Article = (props) => {
  const image = props.image;
  const header = props.header;
  const authors = props.authors;
  const date = props.date;
  const reading_time = props.reading_time;
  const content = props.content;
  const link = props.link;


  return (
    <div className='mx-8 text-grey'>
      <a href={link}>
        <h2 className='text-2xl font-bold mb-4'>{header}</h2>
        <img src={image} alt="" className='aspect-video object-cover mb-4'/>
        <h3 className='text-xl font-medium mb-4'>by <span className='underline'>{authors.first},</span> <span className='underline'>{authors.second} </span>| {date} | {reading_time} min read</h3>
        <p className='text-2xl font-medium mb-8'>{content}</p>
        <Button color='grey' link='/home' text='READ MORE'/>
      </a>
    </div>
  );
};

export default Article;
