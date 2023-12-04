import './App.css';
import './index.css';
import React, { useState, useEffect, Suspense, useRef, useCallback  } from 'react';
import './i18n';
import { fetchBlogPosts } from './contentful';
import HomePage from './HomePage';
import Imprint from './Imprint';
import DataProtectionPolicy from './DataProtectionPolicy';
import AboutUs from './AboutUs';
import Navbar from './Navbar';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import Category from './Category';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [postsDE, setPostsDE] = useState([]);
  const [filteredPostsDE, setFilteredPostsDE] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // New state for search activity
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('language') || i18n.language;
  const searchResultsRef = useRef(null);

  const resetSearch = useCallback(() => {
    setIsSearching(false);
    // Include additional logic here if needed
  }, [setIsSearching]);


  const handleClickOutside = useCallback((event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      resetSearch();
    }
  }, [searchResultsRef, resetSearch]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const textLength = content.split(/\s+/).length;
    return `${Math.ceil(textLength / wordsPerMinute)} min`;
  };

  useEffect(() => {
    const getPosts = async () => {
      const blogPosts = await fetchBlogPosts('en-US');
      setPosts(blogPosts);
      setFilteredPosts(blogPosts); // Initially, filteredPosts is the same as all posts
    };
    getPosts();

    const getPostsDE = async () => {
      const blogPosts = await fetchBlogPosts('de');
      setPostsDE(blogPosts);
      setFilteredPostsDE(blogPosts); // Initially, filteredPosts is the same as all posts
    };
    getPostsDE();

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    // Detect system dark mode preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [i18n]);

  useEffect(() => {
    if (isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearching, handleClickOutside]);

  const handleSearch = (query) => {
    setIsSearching(query.length > 0); // Update isSearching based on query length

    const lowercasedQuery = query.toLowerCase();
    if (currentLanguage !== 'de') {
      const filtered = posts.filter(post =>
        post.fields.title.toLowerCase().includes(lowercasedQuery)
        // Add other fields you want to include in the search
      );
      setFilteredPosts(filtered);
    } else {
      const filtered = postsDE.filter(post =>
        post.fields.title.toLowerCase().includes(lowercasedQuery)
        // Add other fields you want to include in the search
      );
      setFilteredPostsDE(filtered);
    }
  };


  return (
    <Router>
      <div className="App dark:bg-grey">
        <div className='max'>
          <Navbar onSearch={handleSearch}/>
          {isSearching && (
            <div className="fixed inset-0 top-24 lg:top-32 xl:top-24 bg-black bg-opacity-90 z-50 flex justify-center items-start overflow-y-auto" ref={searchResultsRef}>
              <div className='mt-16 max'>
                <div className='lg:flex lg:flex-wrap'>
                  { currentLanguage !== 'de' ? (filteredPosts.map(post => (
                    <div key={post.sys.id} className='lg:w-1/2'>
                      <Link to={`/article/${post.sys.id}`} onClick={resetSearch}>
                        <Article header={post.fields.title} link={`/article/${post.sys.id}`} image={post.fields.image.fields.file.url} authors={post.fields.authors} content={post.fields.content} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} categories={post.fields.categories}/>
                      </Link>
                    </div>
                  ))) : (filteredPostsDE.map(post => (
                    <div key={post.sys.id} className='lg:w-1/2'>
                      <Link to={`/article/${post.sys.id}`} onClick={resetSearch}>
                        <Article header={post.fields.title} link={`/article/${post.sys.id}`} image={post.fields.image.fields.file.url} authors={post.fields.authors} content={post.fields.content} date={formatDate(post.sys.createdAt)} reading_time={calculateReadingTime(post.fields.content)} categories={post.fields.categories}/>
                      </Link>
                    </div>
                  )))}
                </div>
              </div>
            </div>
          )}
          <Suspense fallback="loading">
            <Routes>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/imprint" element={<Imprint />}/>
              <Route path="/data-protection-policy" element={<DataProtectionPolicy />}/>
              <Route path="/about-us" element={<AboutUs />}/>
              <Route path="/article/:articleId" element={<ArticleDetail />}/>
              <Route path="/category/:category" element={<Category />}/>
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
