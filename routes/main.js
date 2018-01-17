const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if(!req.session.userId) {
    res.redirect('login');
  }
  else {
    next();
  }
})


router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router;
