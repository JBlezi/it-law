import React, { useState, useEffect } from 'react';
import EuKommission from './images/Eu-Kommission-PS3.png';
import Button from './button';
import Article from './Article';
import Social from './Social';
import RSSComponent from './RSSComponent';
import { fetchBlogPosts, fetchSocial } from './contentful';



const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);


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

  const article1 = {
    image: EuKommission,
    header: 'The EU Commission’s proposals for PSD3 – transitional provisions, Art. 44, 45 PSD3',
    authors: {first: 'Dr. Paul Schultess', second: 'Jonas Philipp'},
    date: '21. September 2023',
    reading_time: '8',
    content: 'On 28 June 2023, the EU Commission presented proposals for a Payment Services Directive 3 (“PSD3“) and a…'
  };


  const backgroundStyle = posts.length > 0 ? {
    backgroundImage: `url(${posts[0].fields.image.fields.file.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};


  return (
    <div>
      <div style={backgroundStyle} className='h-[90vh] relative'>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <div className='mx-8 relative pt-12'>
          <h1 className='text-4xl font-bold mb-4'>{article1.header}</h1>
          <h2 className='text-xl font-medium mb-4'>by <span className='underline'>{article1.authors.first},</span> <span className='underline'>{article1.authors.second} </span>| {article1.date} | {article1.reading_time} min read</h2>
          <p className='text-2xl font-medium mb-8'>{article1.content}</p>
          <Button color='main' link='/home' text='READ MORE'/>
          <div className='h-[28rem] bg-white p-8 my-8 rounded-lg shadow-lg'>
            <h2 className='text-grey underline'>NEWS</h2>
            <RSSComponent></RSSComponent>
          </div>
        </div>
      </div>
      <div className='mt-64'>
        {posts.map(post => (
          <Article key={post.sys.id} header={post.fields.title} image={post.fields.image.fields.file.url} authors={post.fields.authors} date={article1.date} reading_time={article1.reading_time} content={post.fields.content}/>
        ))}
      </div>
      <div className='mt-32 flex flex-wrap mx-8'>
        <h2 className='text-grey text-xl underline'>FOLLOW US ON SOCIAL MEDIA</h2>
        {socials.map(social => (
          <div className='w-1/2' key={social.sys.id}>
            <Social title={social.fields.title} image={social.fields.icon.fields.file.url} link={social.fields.link}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
