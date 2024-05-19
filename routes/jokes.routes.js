const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokes.controller');


router.post('/', jokeController.createJoke);

router.get('/', jokeController.getAllJokes);


router.get('/:id', jokeController.getJokeById);


router.put('/:id', jokeController.updateJoke);

router.patch('/:id', jokeController.updateJoke)


router.delete('/:id', jokeController.deleteJoke);

module.exports = router;
