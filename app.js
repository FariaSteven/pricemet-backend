const express = require('express');
const cors = require('cors');
const connection = require('./db/connection');
const app = express();
const routes = require('./routes/router');

app.use(cors());

app.use(express.json());

connection();

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server is running at: localhost:3000');
})