const express = require("express");
const app = express();
const cors = require('cors');
const server = require('./server')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));





//*routes
app.get('/', (req,res)=>{
  res.send('Welcome Javier to this great API!')
})



app.listen(`${process.env.DB_PORT}`, (req, res) => {
  console.log('Server runs OK');
});

module.exports = app;