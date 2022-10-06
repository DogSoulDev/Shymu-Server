const express = require("express");
const app = express();
const cors = require('cors');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



module.exports = app;