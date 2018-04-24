const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

require('./app/routes')(app, {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
