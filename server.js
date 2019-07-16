const express = require('express')
const morgan = require('morgan')
const array = require('./movies-data-small')

const server = express()

server.use(morgan('dev'))

console.log("hello");

server.get('/movie', (req, res) =>{
    let movies = [ ...array ];

    const {genre, country, avg_vote} = req.query;

    if(genre){
        movies = movies.filter(movie =>{
           return movie.genre.toLowerCase().includes(genre.toLowerCase());
        })

        // if(movies === []){
        //     return res.status(404).json("Please enter a valid genre")
        // }
    }

    if(country){
        movies = movies.filter(movie =>{
            return movie.country.toLowerCase().includes(country.toLowerCase());
         })

        //  if(!movies){
        //     return res.status(404).json("Please enter a valid country")
        // }
    }

    if(avg_vote){

        // if(Number(avg_vote) === NaN){
        //     return res.status(404).json("Enter a valid number")
        // }

        movies = movies.filter(movie =>{
            return Number(movie.avg_vote) >= Number(avg_vote);
         })
         
    }

    if(movies === []){
        return res.status(404).json("Please enter a valid country")
    }



    res.status(200).json(movies)
})

const PORT = 8000

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})