// VENDOR
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const Database = require('nedb');


// INITS
const app = express();

// CONFIG
const env = require('./env/dev');
app.set('views', './views');
app.set('view engine', 'pug');

// ROUTES
const auth = require('./routes/auth');
const main = require('./routes/main');




// MIDDLEWARES
app.use(session({
  secret: 'hello world',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static('public'));
app.use('/', auth);
app.use('/', main);



app.listen(env.server_port, () => {
  console.log(`Server started @ http://localhost:${env.server_port}`)
})
