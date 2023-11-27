import React, { useState, useEffect } from 'react';

const RSSComponent = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const FEED_URLS = [
      "https://legal-tech.blog/feed",
      "https://legaltechnology.com/feed/",
      "https://www.legalitprofessionals.com/?format=feed&type=rss",
      "https://www.artificiallawyer.com/feed/"
    ];

    const fetchRSS = async () => {
      try {
        const allArticles = [];

        for (const url of FEED_URLS) {
          const encodedUrl = encodeURIComponent(url);
          const response = await fetch(`/proxy?url=${encodedUrl}`);
          const data = await response.json();
          const feedTitle = data.title; // Get the feed title

          // Add the feed title to each article
          const articlesWithFeedTitle = data.items.map(article => ({
            ...article,
            feedTitle
          }));

          allArticles.push(...articlesWithFeedTitle);
        }

        // Sort articles by date
        allArticles.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching RSS", error);
      }
    };

    fetchRSS();
  }, []);

  return (
    <div className='text-white'>
      {articles.slice(0, 3).map((article, index) => (
        <div key={index} className='my-4 py-4 px-4 bg-grey rounded-lg'>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            <h3 className='line-clamp-2'>{article.title}</h3>
            <p className='text-main'>{article.feedTitle} </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default RSSComponent;