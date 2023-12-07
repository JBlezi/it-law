import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './contentful';
import { useTranslation } from 'react-i18next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import './App.css';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const { i18n } = useTranslation();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="custom-paragraph mb-8 text-xl lg:text-3xl xl:leading-normal">{children}</p>
        ),
        [INLINES.HYPERLINK]: (node, children) => (
          <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-main hover:text-blue-800 visited:text-purple-600">
            {children}
          </a>
        ),
      // Add other node type renderers if needed
    },
    // You can also define custom renderers for marks, if necessary
  };


  useEffect(() => {
    const getArticle = async () => {
      const savedLanguage = localStorage.getItem('language') || i18n.language;
      const locale = savedLanguage === 'de' ? 'de' : 'en-US';
      const fetchedArticle = await fetchPost(articleId, locale);
      setArticle(fetchedArticle);
    };

    if (articleId) {
      getArticle();
    }
  }, [articleId, i18n.language]);

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

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='mx-8 text-grey dark:text-light my-16'>
        <img src={article.fields.image.fields.file.url} alt="" className='aspect-video object-cover mb-8 xl:mb-16 xl:w-2/3 rounded-lg'/>
        <h2 className='text-2xl lg:text-5xl font-bold mb-4'>{article.fields.title}</h2>
        <h3 className='text-xl lg:text-3xl font-medium mb-4 md:mb-8'>by <span className='underline'>{article.fields.authors[0]},</span> <span className='underline'>{article.fields.authors[1]}</span>| {formatDate(article.sys.createdAt)} | {`${calculateReadingTime(article.fields.content)} min read`} </h3>
        <div className='mb-12 md:mb-16'>
          {article.fields.categories.map(category =>(
            <span className='px-2 py-1 md:px-4 md:py-2 bg-light-grey md:text-xl rounded-lg mr-2'>{category}</span>
          ))}
        </div>
        <div>
          {documentToReactComponents(article.fields.formattedContent, options)}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
