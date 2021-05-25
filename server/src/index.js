const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Prod check
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// DB Connection
mongoose.connect(process.env.MONGODB_SRC, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.get('/api', (req, res) => {
  res.send('HELLO');
});

const users = require('./routes/users');
app.use('/api/users', users);

const boards = require('./routes/boards');
app.use('/api/boards', boards);

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
