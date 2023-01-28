const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/index')
const {errorHandler} = require('./errorHandler')
const app = express();

app.use(cors());
app.use(express.json())
app.use('/api', apiRouter)

app.use(errorHandler)

module.exports = app;
