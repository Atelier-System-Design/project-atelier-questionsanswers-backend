require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('its working');
});

const router = require('./router.js');


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});