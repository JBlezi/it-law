const Parser = require('rss-parser');

exports.handler = async function(event, context) {
    const url = event.queryStringParameters.url;
    console.log(url);
    if (!url) {
        return {
            statusCode: 400,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: 'URL is required'
        };
    }

    try {
        const parser = new Parser();
        const feed = await parser.parseURL(url);
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(feed)
        };
    } catch (error) {
        console.error('Error fetching RSS feed', error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: 'Error fetching RSS feed'
        };
    }
};
