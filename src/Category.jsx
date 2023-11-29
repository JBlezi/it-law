import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { fetchBlogPostsByCategory } from './contentful';
import Article from './Article';

const ArticleDetail = () => {
  const [posts, setPosts] = useState([]);
  const { i18n } = useTranslation();
  const cacheDuration = 3600000; // 1 hour in milliseconds
  const { category } = useParams();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-8 text-xl">{children}</p>
      ),
      // Add other node type renderers if needed
    },
    // You can also define custom renderers for marks, if necessary
  };

  const fetchAndCacheContent = async (key, fetchFunction, setState, language) => {
    const now = new Date();
    const cachedContent = localStorage.getItem(key);
    if (cachedContent) {
      const { timestamp, data } = JSON.parse(cachedContent);
      console.log(data[0].sys.locale);
      console.log(language);
      if ((now.getTime() - timestamp < cacheDuration) && (data[0].sys.locale === language) ) {
        setState(data);
        return;
      }
    }

    const fetchedData = await fetchFunction(language, category);
    localStorage.setItem(key, JSON.stringify({ timestamp: now.getTime(), data: fetchedData }));
    setState(fetchedData);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    fetchAndCacheContent('blogPostsCache', fetchBlogPostsByCategory, setPosts, savedLanguage === 'de' ? 'de' : 'en-US');
  }, [i18n.language]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = content.split(/\s+/).length; // Split by whitespace and count
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime;
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='mx-8 text-grey dark:text-light my-16'>
        {posts.map(post => (
            <Article key={post.sys.id} link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} content={documentToReactComponents(post.fields.formattedContent, options)}/>
          ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
