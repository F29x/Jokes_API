const Joke = require('../models/jokes.model');


exports.getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.find();
        res.status(200).json(jokes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getJokeById = async (req, res) => {
    try {
        const joke = await Joke.findById(req.params.id);
        if (!joke) {
            return res.status(404).json({ error: 'Joke not found' });
        }
        res.status(200).json(joke);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createJoke = async (req, res) => {
    try {
        let jokes = req.body;

        if (!Array.isArray(jokes)) {
           
            jokes = [jokes];
        }

        
        const createdJokes = [];

        for (const joke of jokes) {
            const { setup, punchline } = joke;
            const newJoke = new Joke({ setup, punchline });
            await newJoke.save();
            createdJokes.push(newJoke);
        }

        res.status(201).json(createdJokes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateJoke = async (req, res) => {
    try {
        const { id } = req.params;
        const { setup, punchline } = req.body;

        const updatedJoke = await Joke.findByIdAndUpdate(id, { setup, punchline }, { new: true });

        if (!updatedJoke) {
            return res.status(404).json({ message: 'Joke not found' });
        }

        res.status(200).json(updatedJoke);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deleteJoke = async (req, res) => {
    try {
        const joke = await Joke.findByIdAndDelete(req.params.id);
        if (!joke) {
            return res.status(404).json({ error: 'Joke not found' });
        }
        res.status(200).json({ message: 'Joke deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
