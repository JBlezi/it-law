import React, { useState, useEffect } from 'react';

const RSSComponent = () => {
  const [articles, setArticles] = useState([]);
  const cacheDuration = 3600000; // 1 hour in milliseconds

  const fetchAndCacheRSS = async () => {
    const FEED_URLS = [
      "https://legal-tech.blog/feed",
      "https://legaltechnology.com/feed/",
      "https://www.legalitprofessionals.com/?format=feed&type=rss",
      "https://www.artificiallawyer.com/feed/"
    ];

    const now = new Date();
    const cachedArticles = localStorage.getItem('rssFeedCache');
    if (cachedArticles) {
      const { timestamp, data } = JSON.parse(cachedArticles);
      if (now.getTime() - timestamp < cacheDuration) {
        setArticles(data);
        return;
      }
    }

    try {
      const allArticles = [];

      for (const url of FEED_URLS) {
        const encodedUrl = encodeURIComponent(url);
        const response = await fetch(`/proxy?url=${encodedUrl}`);
        const data = await response.json();
        const feedTitle = data.title;

        const articlesWithFeedTitle = data.items.map(article => ({
          ...article,
          feedTitle
        }));

        allArticles.push(...articlesWithFeedTitle);
      }

      allArticles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
      localStorage.setItem('rssFeedCache', JSON.stringify({ timestamp: now.getTime(), data: allArticles }));
      setArticles(allArticles);
    } catch (error) {
      console.error("Error fetching RSS", error);
    }
  };

  useEffect(() => {
    fetchAndCacheRSS();
  }, []);

  return (
    <div className='text-white'>
      <div className='hidden xl:block'>
        {articles.slice(0, 10).map((article, index) => (
          <div key={index} className='my-4 py-4 px-4 bg-grey rounded-lg'>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h3 className='line-clamp-2 md:line-clamp-1 md:text-xl'>{article.title}</h3>
              <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
            </a>
          </div>
        ))}
      </div>
      <div className='hidden lg:block xl:hidden'>
        {articles.slice(0, 5).map((article, index) => (
          <div key={index} className='my-4 py-4 px-4 bg-grey rounded-lg'>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h3 className='line-clamp-2 md:line-clamp-1 md:text-xl'>{article.title}</h3>
              <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
            </a>
          </div>
        ))}
      </div>
      <div className='lg:hidden'>
        {articles.slice(0, 3).map((article, index) => (
          <div key={index} className='my-4 py-4 px-4 bg-grey rounded-lg'>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <h3 className='line-clamp-2 md:line-clamp-1 md:text-xl'>{article.title}</h3>
              <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RSSComponent;
