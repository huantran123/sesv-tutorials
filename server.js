import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy route
app.get('/fetch-tutorials', (req, res) => {
  const url = 'https://www.sesvtutorial.com/page-data/tutorials/page-data.json';

  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      res.json(data.result.data.posts.edges)
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch tutorials' });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
