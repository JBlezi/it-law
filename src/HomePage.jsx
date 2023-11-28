import React, { useState, useEffect, useRef } from 'react';
import Button from './button';
import Article from './Article';
import Social from './Social';
import RSSComponent from './RSSComponent';
import { fetchBlogPosts, fetchSocial } from './contentful';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const titleRef = useRef(null);
  const [titleHeight, setTitleHeight] = useState(0);
  const { t, i18n } = useTranslation();
  const cacheDuration = 3600000; // 1 hour in milliseconds

  useEffect(() => {
    if (titleRef.current) {
      setTitleHeight(titleRef.current.offsetHeight);
    }
  }, [posts]);

  const fetchAndCacheContent = async (key, fetchFunction, setState, language) => {
    const now = new Date();
    const cachedContent = localStorage.getItem(key);
    if (cachedContent) {
      const { timestamp, data } = JSON.parse(cachedContent);
      if (now.getTime() - timestamp < cacheDuration) {
        setState(data);
        return;
      }
    }

    const fetchedData = await fetchFunction(language);
    localStorage.setItem(key, JSON.stringify({ timestamp: now.getTime(), data: fetchedData }));
    setState(fetchedData);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    fetchAndCacheContent('blogPostsCache', fetchBlogPosts, setPosts, savedLanguage === 'de' ? 'de' : 'en-US');
    fetchAndCacheContent('socialMediaCache', fetchSocial, setSocials, savedLanguage === 'de' ? 'de' : 'en-US');
  }, [i18n.language]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textLength = content.split(/\s+/).length;
    return `${Math.ceil(textLength / wordsPerMinute)} min read`;
  };

  const backgroundStyle = posts.length > 0 ? {
    backgroundImage: `url(${posts[0].fields.image.fields.file.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};


  return (
    <div className=''>
      <div style={backgroundStyle} className='h-[80vh] relative'>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <div className='mx-8 relative pt-12'>
          <h1 className='text-4xl font-bold mb-4' ref={titleRef}>{ posts.length > 0 ? posts[0].fields.title : ""}</h1>
          <h2 className='text-xl font-medium mb-4'>by <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[0] : ""},</span> <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[1] : ""} </span>| { posts.length > 0 ? formatDate(posts[0].sys.createdAt) : ""}| {posts.length > 0 ? `${calculateReadingTime(posts[0].fields.content)} min read` : ""}</h2>
          <p className='text-2xl font-medium mb-8 line-clamp-3'>{ posts.length > 0 ? posts[0].fields.content : ""}</p>
          <Button color='main' link={ posts.length > 0 ? `/article/${posts[0].sys.id}` : ""} text={t('home.button')}/>
          <div className='h-[28rem] bg-white p-8 my-8 rounded-lg shadow-lg dark:bg-light-grey'>
            <h2 className='text-grey underline dark:text-light'>NEWS</h2>
            <RSSComponent></RSSComponent>
          </div>
        </div>
      </div>
      <div style={{ marginTop: titleHeight + 110 }}>
        {posts.map(post => (
          <Article key={post.sys.id} link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={`${calculateReadingTime(post.fields.content)} min read`} content={post.fields.content}/>
        ))}
      </div>
      <div className='mt-32 flex flex-wrap mx-8'>
        <h2 className='text-grey dark:text-light text-xl underline'>{t('home.social')}</h2>
        {socials.length > 0 && socials.map(social => (
          <div className='w-1/2' key={social.sys.id}>
            <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
