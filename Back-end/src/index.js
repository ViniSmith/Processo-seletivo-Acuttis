const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('OK')
});

app.listen(3000);