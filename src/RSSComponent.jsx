import React, { useState, useEffect } from 'react';

const RSSComponent = ({ onRendered }) => {
  const [articles, setArticles] = useState([]);
  const cacheDuration = 3600000; // 1 hour in milliseconds
  const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      const fetchAndCacheRSS = async (retryCount = 3) => {
        localStorage.getItem('rssFeedCache') ? setIsLoading(false) : setIsLoading(true);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const FEED_URLS = [
          "https://legaltechnology.com/feed/",
          "https://legal-tech.blog/feed",
          "https://www.legalitprofessionals.com/?format=feed&type=rss",
          "https://www.artificiallawyer.com/feed/"
        ];

        const now = new Date();
        const cachedArticles = localStorage.getItem('rssFeedCache');
        if (cachedArticles) {
          const { timestamp, data } = JSON.parse(cachedArticles);
          if (now.getTime() - timestamp < cacheDuration) {
            setArticles(data);
            setIsLoading(false);
            return;
          }
        }

        try {
          const allArticles = [];

          for (const url of FEED_URLS) {
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`/.netlify/functions/proxy?url=${encodedUrl}`);
            if (!response.ok) {
              throw new Error(`Network response was not ok, status: ${response.status}`);
            }
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
          setIsLoading(false);
          setArticles(allArticles);
          // Delay calling onRendered
          setTimeout(() => {
            if (typeof onRendered === 'function') {
              onRendered();
            }
          }, 500); // Delay of 500ms
        } catch (error) {
          console.error("Error fetching RSS", error);
          if (retryCount > 0) {
            console.log(`Retrying... Attempts left: ${retryCount}`);
            await delay(3000); // Wait for 3 seconds before retrying
            fetchAndCacheRSS(retryCount - 1);
          } else {
            setIsLoading(false);
          }
        }
      };

      fetchAndCacheRSS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (articles.length > 0 && typeof onRendered === 'function') {
        onRendered();
      }
    }, 500); // Delay of 300ms
  }, [articles, onRendered]);


  return (
    <div className='text-white'>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div className='hidden xl:block'>
            {articles.slice(0, 8).map((article, index) => (
              <div key={index} className='my-4 py-4 px-4 dark:bg-grey bg-gray-300 text-grey dark:text-light rounded-lg'>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <h3 className='line-clamp-2 md:line-clamp-1 xl:line-clamp-3 md:text-xl'>{article.title}</h3>
                  <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
                </a>
              </div>
            ))}
          </div>
          <div className='hidden lg:block xl:hidden'>
            {articles.slice(0, 5).map((article, index) => (
              <div key={index} className='my-4 py-4 px-4 dark:bg-grey bg-gray-300 text-grey dark:text-light rounded-lg'>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <h3 className='line-clamp-2 md:line-clamp-1 md:text-xl'>{article.title}</h3>
                  <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
                </a>
              </div>
            ))}
          </div>
          <div className='lg:hidden'>
            {articles.slice(0, 3).map((article, index) => (
              <div key={index} className='my-4 py-4 px-4 dark:bg-grey bg-gray-300 text-grey dark:text-light rounded-lg'>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <h3 className='line-clamp-2 md:line-clamp-1 md:text-xl'>{article.title}</h3>
                  <p className='text-main line-clamp-1 md:text-xl'>{article.feedTitle}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RSSComponent;
