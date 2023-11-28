import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './contentful';
import { useTranslation } from 'react-i18next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const { i18n } = useTranslation();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-8 text-lg">{children}</p>
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
      console.log("format", fetchedArticle.fields.formattedContent.content[0].content[0].value)
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
        <img src={article.fields.image.fields.file.url} alt="" className='aspect-video object-cover mb-4'/>
        <h2 className='text-2xl font-bold mb-4'>{article.fields.title}</h2>
        <h3 className='text-xl font-medium mb-16'>by <span className='underline'>{article.fields.authors[0]},</span> <span className='underline'>{article.fields.authors[1]}</span>| {formatDate(article.sys.createdAt)} | {`${calculateReadingTime(article.fields.content)} min read`} </h3>
        <div>
          {documentToReactComponents(article.fields.formattedContent, options)}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
