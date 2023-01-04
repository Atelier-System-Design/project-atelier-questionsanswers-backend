require('dotenv').config();
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');
const app = express();
const PORT = process.env.PORT;


app.get('/', (req, res) => {
  res.send('qa service');
});

app.use(express.json());
app.use(cors());
app.use(express.static('../client/dist'));
const router = require('./router.js');

app.use('/qa', router);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});