const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const itemsRouter = require('./routes/itemsRoutes');
//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello from the middleware🤣');
  next();
});

//Mouting

app.use('/api-rentit/v1/items', itemsRouter);

module.exports = app;
