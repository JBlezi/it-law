const fetch = require('node-fetch');
const Parser = require('rss-parser');

const parser = new Parser();

exports.handler = async (event, context) => {
  try {
    // Check if URL parameter is provided
    const { url } = event.queryStringParameters;
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL parameter is required' })
      };
    }

    // Decode and parse the RSS feed
    const feedUrl = decodeURIComponent(url);
    const feed = await parser.parseURL(feedUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(feed)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
