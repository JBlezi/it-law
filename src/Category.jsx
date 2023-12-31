import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { fetchBlogPosts } from './contentful';
import Article from './Article';

const ArticleDetail = () => {
  const [posts, setPosts] = useState([]);
  const { i18n } = useTranslation();
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

  const fetchContent = async (fetchFunction, setState, language) => {

    const fetchedData = await fetchFunction(language);
    console.log(fetchedData);
    const filteredPosts = fetchedData.filter(post =>
      post.fields.categories && post.fields.categories.includes(category)
    );
    console.log(filteredPosts)
    setState(filteredPosts);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || i18n.language;
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    fetchContent(fetchBlogPosts, setPosts, savedLanguage === 'de' ? 'de' : 'en-US');
  }, [i18n.language, category]);


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
      <div className='mx-8 text-grey dark:text-light my-16 lg:flex lg:flex-wrap'>
          {posts.map(post => (
            <div className='lg:w-1/2'>
              <Article key={post.sys.id} link={`/article/${post.sys.id}`} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} content={documentToReactComponents(post.fields.formattedContent, options)}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
