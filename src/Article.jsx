import React from 'react';
import Button from './button';
import { useTranslation } from 'react-i18next';

const Article = (props) => {
  const image = props.image;
  const header = props.header;
  const authors = props.authors;
  const link = props.link;
  const categories = props.categories;
  const date = props.date || 1;
  const reading_time = props.reading_time;
  const content = props.content;
  const { t } = useTranslation();


  return (
    <div className='mx-8 text-grey dark:text-light my-16 xl:mb-32'>
      <h2 className='text-2xl md:text-4xl font-bold mb-4'>{header}</h2>
      <img src={image} alt="" className='aspect-video object-cover mb-4 rounded-lg'/>
      <h3 className='text-xl lg:text-2xl font-medium mb-2 md:mb-4'>by <span className='underline'>{authors[0]},</span> <span className='underline'>{authors[1]}</span>| {date} | {reading_time} min</h3>
      <div className='mb-4 md:mb-8'>
        {categories.map(category =>(
          <span key={category} className='px-2 py-1 md:px-4 md:py-2 bg-light-grey md:text-xl rounded-lg mr-2'>{category}</span>
          ))}
      </div>
      <p className='text-2xl lg:text-3xl font-medium mb-8 line-clamp-3'>{content}</p>
      <Button color='main' link={link} text={t('home.button')}/>
    </div>
  );
};

export default Article;
