var express = require('express')
var ejs = require('ejs')
var mysql = require('mysql')

var app = express()
var db =  {
  host:'128.199.119.79',
  username:'imarket',
  password:'p@ssword',
  database:'imarket'
}
var pool = mysql.createPool(db)

app.listen(2000)

app.engine('html', ejs.renderFile)

app.get('/', showHome)
app.get('/list', showList)
app.get('/status', showStatus)

app.use(express.static('public') )
app.use( showError )

function showHome(req, res) {
  res.render('index.html')
}

function showStatus(req, res) {
  res.send({status:'OK'})
}

function showList(req, res) {
  pool.query('select * from post',
  function (err, data) {
    res.render('list.html', {post:data})
  })
}

function showError(req, res) {
  res.render('error.html')
}