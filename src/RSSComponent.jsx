import React, { useState, useEffect } from 'react';

const RSSComponent = () => {
  const [articles, setArticles] = useState([]);
  const [feed, setFeed] = useState();

  useEffect(() => {
    console.log(feed);
    const FEED_URL = encodeURIComponent("https://legal-tech.blog/feed");
    const PROXY_URL = `/proxy?url=${FEED_URL}`;

    const fetchRSS = async () => {
      try {
        const response = await fetch(PROXY_URL);
        const data = await response.json();
        setArticles(data.items);
        setFeed(data.title);
      } catch (error) {
        console.error("Error fetching RSS", error);
      }
    };

    fetchRSS();
  }, [feed]);

  useEffect(() => {
    if (feed) {
      console.log(feed);
      // Additional logic to handle 'feed' data
    }
  }, [feed]);

  return (
    <div className='text-white'>
      {articles.slice(0, 3).map((article, index) => (
        <div key={index} className='my-4 py-4 px-4 bg-grey rounded-lg'>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            <h3 className='line-clamp-2'>{article.title}</h3>
            <p className='text-main'>{feed}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default RSSComponent;
