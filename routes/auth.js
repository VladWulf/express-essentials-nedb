const express = require('express');
const router = express.Router();
const Database = require('nedb');


// INITS
const users = new Database({filename: './db/users'})
users.loadDatabase( err => {
  if(!err) console.log('Users database loaded..')
})
users.ensureIndex({ fieldName: 'username', unique: true });

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/login', (req, res) => {
  const data = req.body;
  if(!data.username || !data.password) return res.redirect('login');
  users.findOne({username: data.username}, (err, doc) => {
    if(err) res.status(500).send('something went wrong on the server');
    if(doc && doc.password === data.password) {
      req.session.userId = doc._id;
      res.redirect('/');
    } else {
      res.redirect('login')
    }
  })
})

router.post('/register', (req, res) => {
  const data = req.body;
  if(!data.username || !data.password) return res.redirect('login');
  users.insert({username: data.username,password: data.password}, (err, doc) => {
    if(err) {
      res.status(500).send('something went wrong on the server');
    } else {
      req.session.userId = doc._id;
      res.redirect('/');
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
})


module.exports = router;
