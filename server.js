const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/router');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views'));

app.use('/api', apiRoutes);

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.get("/", (req, res) => res.send("Express on Vercel")); // vercel deployment

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

