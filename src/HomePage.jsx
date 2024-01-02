import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from './button';
import Article from './Article';
import Social from './Social';
import RSSComponent from './RSSComponent';
import { fetchBlogPosts, fetchSocial } from './contentful';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const [marginAboveArticles, setMarginAboveArticles] = useState(0);
  const [rssRendered, setRssRendered] = useState(false);
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const titleRef3 = useRef(null);
  const { t, i18n } = useTranslation();
  const cacheDuration = 3600000; // 1 hour in millisecond

  useEffect(() => {
    if (titleRef.current && titleRef2.current && titleRef3.current) {
      const topContentHeight = titleRef.current.offsetHeight;
      const rssFeedHeight = titleRef2.current.offsetHeight;
      const heroContainerHeight = titleRef3.current.offsetHeight;

      // Calculate the protrusion of the RSS feed div
      const protrusion = (topContentHeight + rssFeedHeight) - heroContainerHeight;

      // Set margin to ensure consistent spacing
      setMarginAboveArticles(Math.max(0, protrusion));
    }
  }, [posts, socials, rssRendered]);

  const fetchAndCacheContent = useCallback(async (key, fetchFunction, setState, language) => {
    const now = new Date();
    const cachedContent = localStorage.getItem(key);
    if (cachedContent) {
      const { timestamp, data } = JSON.parse(cachedContent);
      if (data && data.length > 0 && (now.getTime() - timestamp < cacheDuration)) {
        if (data[0].sys && data[0].sys.locale === language) {
          setState(data);
          return;
        }
      }
    }

    const fetchedData = await fetchFunction(language);
    localStorage.setItem(key, JSON.stringify({ timestamp: now.getTime(), data: fetchedData }));
    setState(fetchedData);
  },
  [cacheDuration] // Include other dependencies if there are any
);


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    fetchAndCacheContent('blogPostsCache', fetchBlogPosts, setPosts, savedLanguage === 'de' ? 'de' : 'en-US');
    fetchAndCacheContent('socialMediaCache', fetchSocial, setSocials, savedLanguage === 'de' ? 'de' : 'en-US');
  }, [i18n.language, fetchAndCacheContent, i18n]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textLength = content.split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };

  const backgroundStyle = posts.length > 0 ? {
    backgroundImage: `url(${posts[0].fields.image.fields.file.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};


  return (
    <div className=''>
      <Helmet>
        <title>Home Page IT-Law Blog</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>
      <div style={backgroundStyle} className='h-[80vh] lg:min-h-[550px] relative xl:rounded-lg' ref={titleRef3}>
        <div className='absolute inset-0 bg-black bg-opacity-70 xl:rounded-xl'></div>
        <div className='mx-8 lg:mx-16 relative pt-12 dark:text-light'>
          <div ref={titleRef}>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 xl:mt-16'>{ posts.length > 0 ? posts[0].fields.title : ""}</h1>
            <h2 className='text-xl font-medium mb-4 xl:mb-16'>by <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[0] : ""},</span> <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[1] : ""} </span>| { posts.length > 0 ? formatDate(posts[0].sys.createdAt) : ""}| {posts.length > 0 ? `${calculateReadingTime(posts[0].fields.content)} min read` : ""}</h2>
            <p className='text-2xl xl:text-3xl font-medium mb-8 line-clamp-3 leading-normal xl:mb-16'>{ posts.length > 0 ? posts[0].fields.content : ""}</p>
            <Button color='main' link={ posts.length > 0 ? `/article/${posts[0].sys.id}` : ""} text={t('home.button')}/>
          </div>
          <div className='xl:hidden xl:justify-end xl:w-full'>
            <div className='h-min-content bg-white p-8 my-8 rounded-lg shadow-lg dark:bg-light-grey xl:w-1/3' ref={titleRef2}>
              <h2 className='text-grey underline md:text-2xl dark:text-light'>NEWS</h2>
              <RSSComponent onRendered={() => setRssRendered(true)} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: marginAboveArticles + 120}} className='xl:hidden flex flex-wrap'>
        {posts.slice(1).map(post => (
          <div className='lg:w-1/2' key={post.sys.id} >
              <Article link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} content={post.fields.content} categories={post.fields.categories}/>
          </div>
        ))}
      </div>
      <div className='hidden xl:flex mr-16'>
        <div className='w-3/5 mx-8'>
          {posts.slice(1, 3).map(post => (
            <div key={post.sys.id}>
              <Article  link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} content={post.fields.content} categories={post.fields.categories}/>
            </div>
          ))}
        </div>
        <div className='w-2/5'>
          <div className='h-min-content bg-white p-8 my-8 rounded-lg shadow-lg dark:bg-light-grey'>
            <h2 className='text-grey underline md:text-2xl dark:text-light'>NEWS</h2>
            <RSSComponent onRendered={() => setRssRendered(true)} />
          </div>
          {socials.length > 0 ? (
            <div className='p-8 dark:bg-light-grey bg-white rounded-lg my-16'>
              <div className='hidden xl:block'>
                <h2 className='text-grey dark:text-light text-xl md:text-2xl underline'>{t('home.social')}</h2>
                <div className=' flex flex-wrap'>
                  {socials.length > 0 && socials.map(social => (
                    <div className='w-1/2' key={social.sys.id}>
                      <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : "" }
        </div>
      </div>
      {socials.length > 0 ? (
        <div className='mt-32 mx-8 xl:hidden'>
          <h2 className='text-grey dark:text-light text-xl md:text-2xl xl:text-4xl underline'>{t('home.social')}</h2>
          <div className=' flex flex-wrap mx-8 xl:my-16'>
            {socials.length > 0 && socials.map(social => (
              <div className='w-1/2 md:w-1/3 lg:w-1/4' key={social.sys.id}>
                <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
              </div>
            ))}
          </div>
        </div>
      ) : "" }
    </div>
  );
};

export default HomePage;
