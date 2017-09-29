var express = require('express');
var router = express.Router();

const Schema = require('../db/schema.js');
const MovieModel = Schema.MovieModel;

// Get Movies Index page
router.get('/', (req, res) => {
  MovieModel.find({})
    .then((movies) => {
      res.render('movies/index', {
        movies: movies
      })
    })
    .catch((error) => {
      res.render('error')
    })
})

// Get Movies Show page
router.get('/movies/:movieId', (req, res) => {
  const movieId = req.params.movieId

  MovieModel.findById(movieId)
    .then((movie) => {
      res.render('movies/show', {
        movie: movie
      })
    })
    .catch((error) => {
      res.render('error')
    })
})

module.exports = router;
