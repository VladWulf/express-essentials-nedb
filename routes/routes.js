const express = require('express');
const router = express.Router();


function routes(NEDB) {
  router.use((req, res, next) => {
    if (!req.session.userId) {
      res.redirect('login');
    } else {
      next();
    }
  })

  router.get('/', (req, res) => {
    res.render('index')
  })

  return router
}


module.exports = routes;
