import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from './contentful';
import { useTranslation } from 'react-i18next';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const { i18n } = useTranslation();

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

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.fields.title}</h1>
      {/* Display more article details here */}
    </div>
  );
};

export default ArticleDetail;
