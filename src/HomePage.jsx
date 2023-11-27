import React, { useState, useEffect, useRef } from 'react';
import Button from './button';
import Article from './Article';
import Social from './Social';
import RSSComponent from './RSSComponent';
import { fetchBlogPosts, fetchSocial } from './contentful';



const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const titleRef = useRef(null); // Create a ref for the title element
  const [titleHeight, setTitleHeight] = useState(0);

  useEffect(() => {
    if (titleRef.current) {
      const height = titleRef.current.offsetHeight; // Get the height of the title element
      setTitleHeight(height); // Set the state with the height
    }
  }, [posts]); // Depend on posts so it recalculates when posts data changes



  useEffect(() => {
    const getPosts = async () => {
      const blogPosts = await fetchBlogPosts();
      setPosts(blogPosts);
    };
    getPosts();

    const getSocials = async () => {
      const socialMedia = await fetchSocial();
      setSocials(socialMedia);
    };
    getSocials();
  },[]);

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


  const backgroundStyle = posts.length > 0 ? {
    backgroundImage: `url(${posts[0].fields.image.fields.file.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};


  return (
    <div>
      <div style={backgroundStyle} className='h-[80vh] relative'>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <div className='mx-8 relative pt-12'>
          <h1 className='text-4xl font-bold mb-4' ref={titleRef}>{ posts.length > 0 ? posts[0].fields.title : ""}</h1>
          <h2 className='text-xl font-medium mb-4'>by <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[0] : ""},</span> <span className='underline'>{ posts.length > 0 ? posts[0].fields.authors[1] : ""} </span>| { posts.length > 0 ? formatDate(posts[0].sys.createdAt) : ""}| {posts.length > 0 ? `${calculateReadingTime(posts[0].fields.content)} min read` : ""}</h2>
          <p className='text-2xl font-medium mb-8 line-clamp-3'>{ posts.length > 0 ? posts[0].fields.content : ""}</p>
          <Button color='main' link='/home' text='READ MORE'/>
          <div className='h-[28rem] bg-white p-8 my-8 rounded-lg shadow-lg'>
            <h2 className='text-grey underline'>NEWS</h2>
            <RSSComponent></RSSComponent>
          </div>
        </div>
      </div>
      <div style={{ marginTop: titleHeight + 100 }}>
        {posts.map(post => (
          <Article key={post.sys.id} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={formatDate(post.sys.createdAt)} reading_time={`${calculateReadingTime(post.fields.content)} min read`} content={post.fields.content}/>
        ))}
      </div>
      <div className='mt-32 flex flex-wrap mx-8'>
        <h2 className='text-grey text-xl underline'>FOLLOW US ON SOCIAL MEDIA</h2>
        {socials.length > 0 && socials.map(social => (
          <div className='w-1/2' key={social.sys.id}>
            <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
