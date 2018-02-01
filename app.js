// VENDOR
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const NEDB = require('nedb');
const YAML = require('yamljs')

let env = YAML.load(__dirname + '/env/env.yml')
config = env[env.environment]


if (env.environment === 'development') {
  const autoreload = require('connect-autoreload');
  const reloadServer = express()
  reloadServer.use(autoreload({
    watch_dirs: 'views public',
    delay: 150
  }))
  reloadServer.listen(60000, () => {
    console.log('Reload server running')
  })
}

// INITS
const app = express();

// CONFIG
app.set('views', './views');
app.set('view engine', 'pug');

// ROUTES
const auth = require('./routes/auth')(NEDB);
const routes = require('./routes/routes')(NEDB);

// MIDDLEWARES
app.use(session({
  secret: 'hello world',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use('/static', express.static('public'));
app.use('/', auth);
app.use('/', routes);


app.listen(config.server_port, config.server_host, () => {
  console.log(`Server started @ ${config.protocol}://${config.server_host}:${config.server_port}`)
})
