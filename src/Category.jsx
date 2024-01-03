import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { fetchBlogPosts } from './contentful';
import Article from './Article';
import { Helmet } from 'react-helmet';

const ArticleDetail = () => {
  const [posts, setPosts] = useState([]);
  const { t, i18n } = useTranslation();
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

  const fetchContent = useCallback(async (fetchFunction, setState, language) => {
    const fetchedData = await fetchFunction(language);
    console.log(fetchedData);
    const filteredPosts = fetchedData.filter(post =>
      post.fields.categories && post.fields.categories.includes(category)
    );
    console.log(filteredPosts);
    setState(filteredPosts);
  },
  [category] // include other dependencies if fetchFunction and setState come from props or state
);


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    fetchContent(fetchBlogPosts, setPosts, savedLanguage === 'de' ? 'de' : 'en-US');
  }, [i18n.language, category, fetchContent, i18n]);


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
      <Helmet>
        <title>{t('category.title')} {category}</title>
        <meta name="description" content={t('category.description') + `${category}`}  />
      </Helmet>
      <h1 className='mx-8 text-2xl lg:text-3xl font-bold mt-16 text-grey dark:text-light'><span className='px-2 py-1 md:px-4 md:py-2 dark:bg-light-grey dark:text-light bg-gray-300 md:text-3xl rounded-lg mr-2'>{category}</span></h1>
      <div className='text-grey dark:text-light my-8 lg:flex lg:flex-wrap'>
          {posts.map(post => (
            <div className='lg:w-1/2 mb-32'>
              <Article key={post.sys.id} link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} content={documentToReactComponents(post.fields.formattedContent, options)} categories={post.fields.categories}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
