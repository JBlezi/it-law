import React from 'react';
import Button from './button';
import { useTranslation } from 'react-i18next';

const Article = (props) => {
  const image = props.image;
  const header = props.header;
  const authors = props.authors;
  const date = props.date || 1;
  const reading_time = props.reading_time || 3;
  const content = props.content;
  const { t } = useTranslation();


  return (
    <div className='mx-8 text-grey my-16'>
      <h2 className='text-2xl font-bold mb-4'>{header}</h2>
      <img src={image} alt="" className='aspect-video object-cover mb-4'/>
      <h3 className='text-xl font-medium mb-4'>by <span className='underline'>{authors[0]},</span> <span className='underline'>{authors[1]}</span>| {date} | {reading_time} </h3>
      <p className='text-2xl font-medium mb-8 line-clamp-3'>{content}</p>
      <Button color='grey' link='/home' text={t('home.button')}/>
    </div>
  );
};

export default Article;
