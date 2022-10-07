const express = require("express");
const app = express();
const cors = require('cors');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(`${process.env.DB_PORT}`, (req, res) => {
  console.log('Server runs OK');
});

module.exports = app;