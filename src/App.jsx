import './App.css';
import './index.css';
import React, { useState, useEffect, Suspense } from 'react';
import './i18n';
import { fetchBlogPosts } from './contentful';
import HomePage from './HomePage';
import Imprint from './Imprint';
import DataProtectionPolicy from './DataProtectionPolicy';
import AboutUs from './AboutUs';
import Navbar from './Navbar';
import Article from './Article';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // New state for search activity

  useEffect(() => {
    const getPosts = async () => {
      const blogPosts = await fetchBlogPosts();
      setPosts(blogPosts);
      setFilteredPosts(blogPosts); // Initially, filteredPosts is the same as all posts
    };
    getPosts();
  }, []);

  const handleSearch = (query) => {
    setIsSearching(query.length > 0); // Update isSearching based on query length

    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter(post =>
      post.fields.title.toLowerCase().includes(lowercasedQuery)
      // Add other fields you want to include in the search
    );
    setFilteredPosts(filtered);
  };


  return (
    <Router>
      <div className="App">
        <Navbar onSearch={handleSearch}/>
        <Suspense fallback="loading">
          {isSearching ? (
            <div className='mt-16'>
              {filteredPosts.map(post => (
                <Article key={post.sys.id} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} content={post.fields.content}/>
              ))}
            </div>
          ) : (
            <Routes>
              <Route path="/home" element={<HomePage />}/>
              <Route path="/imprint" element={<Imprint />}/>
              <Route path="/data-protection-policy" element={<DataProtectionPolicy />}/>
              <Route path="/about-us" element={<AboutUs />}/>
            </Routes>
          )}
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
