const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    res.json(feed);
  } catch (error) {
    console.error('Error fetching RSS feed', error);
    res.status(500).send('Error fetching RSS feed');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
