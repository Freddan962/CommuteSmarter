const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

require('./app/routes')(app, {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
