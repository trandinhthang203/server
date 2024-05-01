const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const mongoose = require('mongoose')
require('./fruitsModel');

var fruitsAPI = require('./fruitsAPI');
app.use('/fruits', fruitsAPI)

mongoose.connect('mongodb://localhost:27017/fruits', {})
.then(()=>console.log('>>>>> DB Connected'))
.catch(err => console.log('>>>> DB Error: ', err));

app.get('/', (req, res)=>{
  res.json("Xin chao dinh thang")
})

app.get('/home', (req, res)=>{
  res.json("HOME")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})