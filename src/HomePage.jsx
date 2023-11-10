import React from 'react';
import EuKommission from './images/Eu-Kommission-PS3.png';
import Button from './button';
import Article from './Article';
import FeedArticle from './feedArticle';

const HomePage = () => {

  const article1 = {
    image: EuKommission,
    header: 'The EU Commission’s proposals for PSD3 – transitional provisions, Art. 44, 45 PSD3',
    authors: {first: 'Dr. Paul Schultess', second: 'Jonas Philipp'},
    date: '21. September 2023',
    reading_time: '8',
    content: 'On 28 June 2023, the EU Commission presented proposals for a Payment Services Directive 3 (“PSD3“) and a…'
  };

  const feedArticle1 = {
    title: 'BaFin applies ESMA guidelines for DLT-based market infrastructures',
    source: 'Bafin',
    link: 'https://www.bafin.de/DE/Startseite/startseite_node.html'
  };

  const backgroundStyle = {
    backgroundImage: `url(${article1.image})`,
    backgroundSize: 'cover', // or other CSS background properties you need
    backgroundPosition: 'center'
  };

  return (
    <div>
      <div style={backgroundStyle} className='h-[90vh] relative'>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
        <div className='mx-8 relative pt-12'>
          <h1 className='text-4xl font-bold mb-4'>{article1.header}</h1>
          <h2 className='text-xl font-medium mb-4'>by <span className='underline'>{article1.authors.first},</span> <span className='underline'>{article1.authors.second} </span>| {article1.date} | {article1.reading_time} min read</h2>
          <p className='text-2xl font-medium mb-8'>{article1.content}</p>
          <Button color='main' link='/home' text='READ MORE'/>
          <div className='h-96 bg-white p-8 my-8 rounded-lg'>
            <h2 className='text-grey underline'>NEWS</h2>
            <FeedArticle title={feedArticle1.title} source={feedArticle1.source} link={feedArticle1.link} />
          </div>
        </div>
      </div>
      <Article header={article1.header} image={article1.image} authors={article1.authors} date={article1.date} reading_time={article1.reading_time} content={article1.content}/>
    </div>
  );
};

export default HomePage;
