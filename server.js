const express = require('express');
const connectDB = require('./config/mongoose.config');
const jokesRouter = require('./routes/jokes.routes');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use('/api/jokes', jokesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
