const express = require('express');
const router = express.Router();
const Database = require('nedb');
const bcrypt = require('bcrypt');

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
    if(err) res.status(500).send('something went wrong with db');
    if(doc) {
      bcrypt.compare(data.password, doc.password, (err, result) => {
        if(err) res.status(500).send('something went wrong with password');
        if(result === true) {
          req.session.userId = doc._id;
          res.redirect('/');
        } else {
          res.redirect('login')
        }
      })
    } else {
      res.redirect('login')
    }
  })
})

router.post('/register', (req, res) => {
  const data = req.body;
  if(!data.username || !data.password) return res.redirect('login');
  Promise.resolve(new Promise((resolve, reject) => {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if(err) reject(err);
      if(hash) resolve(hash);
    })
  })).then(hash => {
    users.insert(
      {username: data.username, password: hash}, (err, doc) => {
      if(err) {
        res.status(500).send('something went wrong with db');
      } else {
        req.session.userId = doc._id;
        res.redirect('/');
      }
    })
  }).catch(error => res.status(500).send(error));
})

router.get('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
})


module.exports = router;
