const express = require('express');
const axios = require('axios');

const newsRouter = express.Router();

newsRouter.get('/getNews', async (req, res) => {
  try {
    const response = await axios.post('https://api.igdb.com/v4/games', 
      'fields name, summary, created_at, cover, release_dates, genres, involved_companies; limit 5;', 
      {
        headers: {
          'Client-ID': 'p3ku78dhxobzatreeg0tqwrx3krbz8',
          'Authorization': 'Bearer 71ch09h91g30h2dbh8cnnpb2d3f7ze',
          'Content-Type': 'text/plain',
        },
      }
    );
    res.json(response.data);

    console.log(response.data)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching games');
  }
});




module.exports = newsRouter;
