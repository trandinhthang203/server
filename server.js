const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
  res.json("Xin chao dinh thang")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})