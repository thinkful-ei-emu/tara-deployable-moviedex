const express = require("express");
const morgan = require("morgan");
const helmet = require('helmet');
const cors = require('cors');
const array = require("./movies-data-small");
require("dotenv").config();

const server = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use(function validateBearerToken(req, res, next) {
    const authToken = req.get('Authorization');
    const apiToken = process.env.API_TOKEN;
    console.log('validate bearer token');

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'});
    }
    next();
});

function handleGetMovies(req, res) {
  let movies = [...array];

  const { genre, country, avg_vote } = req.query;

  if (genre) {
    movies = movies.filter(movie => {
      return movie.genre.toLowerCase().includes(genre.toLowerCase());
    });

    // if(movies === []){
    //     return res.status(404).json("Please enter a valid genre")
    // }
  }

  if (country) {
    movies = movies.filter(movie => {
      return movie.country.toLowerCase().includes(country.toLowerCase());
    });

    //  if(!movies){
    //     return res.status(404).json("Please enter a valid country")
    // }
  }

  if (avg_vote) {
    // if(Number(avg_vote) === NaN){
    //     return res.status(404).json("Enter a valid number")
    // }

    movies = movies.filter(movie => {
      return Number(movie.avg_vote) >= Number(avg_vote);
    });
  }

  if (movies === []) {
    return res.status(404).json("Please enter a valid country");
  }

  res.status(200).json(movies);
}

server.get("/movie", handleGetMovies);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
