var express = require('express')
var app = express()
var body = require('body-parser').urlencoded({extended:false})
app.listen(2000)
var mysql = require('mysql');
var db = {
  host:'128.199.119.79',
  user:'imarket',
  password:'p@ssword',
  database:'imarket'
}
var pool = mysql.createPool(db)

app.engine('html', require('ejs').renderFile)
app.get('/', showHome)
app.get('/list', showList);
app.get('/status', showStatus)
app.get('/register', showRegisterPage)
app.post('/register', body, saveNewUser)
app.get('/login', showLoginPage)
app.post('/login', body, checkPassword)
app.use( express.static('public') )
app.use( showError )

function showStatus(req, res) {
  res.send({status:'OK'})
}

function showHome(req, res) {
  res.render('index.html')
}

function showRegisterPage(req, res) {
  res.render('register.html')
}

function showError(req, res) {
  res.render('error.html')
}

function showList(req, res) {
  pool.query('select * from post',
    function (error, data) {
      res.render('list.html', {post: data})
    }
  )
}

function saveNewUser(req, res) {
  pool.query(`
    insert into member( email, password, name)
    values(?,sha2(?, 512),?)
    `,
    [req.body.email, req.body.password, req.body.fullname],
    (err, data) => {
      res.redirect('login.html')
    })
}

function showLoginPage(req, res) {
  res.render('login.html')
}

function checkPassword(req, res) {
  pool.query(`
    select * from member
    where email = ? and
    password = sha2(?, 512)
  `, [req.body.email, req.body.password],
  (err, data) => {
    if (data.length == 0) {
      res.redirect('/login?massage=Incorrect Password')
    } else {
      res.send('Password is OK')
    }
  })
}