import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './button';
import Toast from './Toast';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { IoShareOutline } from "react-icons/io5";

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
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const triggerToast = (msg) => {
    setMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // auto-hide after 3 seconds
  };

  const shareArticle = async () => {
    console.log(navigator.share);
    if (navigator.share) {
      try {
        await navigator.share({
          title: header,
          text: `Check out this article: ${header}`,
          url: link
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log("Web Share API is not supported in your browser.");
      setTimeout(() => {
        navigator.clipboard.writeText(`http://localhost:8888${link}`)
        .then(() => {
          triggerToast("URL copied to clipboard!"); // Call the function here
        }).catch(err => console.error("Clipboard write failed", err));
      }, 100); // Delay in milliseconds

    }
  };


  return (
    <article className='mx-8 text-grey dark:text-light my-8 lg:my-16 xl:mb-32'>
      <Toast message={message} showToast={showToast} closeToast={() => setShowToast(false)} />
      <Link to={link}>
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>{header}</h2>
        <img src={image} alt="" className='aspect-video object-cover mb-4 rounded-lg'/>
      </Link>
      <h3 className='text-xl lg:text-2xl font-medium mb-2 md:mb-4'>by <span className='underline'>{authors[0]},</span> <span className='underline'>{authors[1]}</span>| {date} | {reading_time} min</h3>
      <div className='mb-4 md:mb-8'>
        {categories.map(category =>(
          <span key={category} className='px-2 py-1 md:px-4 md:py-2 dark:bg-light-grey dark:text-light bg-gray-300 md:text-xl rounded-lg mr-2'>{category}</span>
          ))}
      </div>
      <Link to={link}>
        <p className='text-2xl lg:text-3xl font-medium mb-8 line-clamp-3'>{content}</p>
      </Link>
      <div className='flex items-center'>
        <Button color='main' link={link} text={t('home.button')}/>
        <IoShareOutline onClick={shareArticle} className='text-3xl ml-8 text hover:opacity-70 cursor-pointer'/>
      </div>
    </article>
  );
};

export default Article;
