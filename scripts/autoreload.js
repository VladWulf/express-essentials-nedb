const YAML = require('yamljs');
const path = require('path')
let env = YAML.load(path.resolve(__dirname, '../env/env.yml'))

if (env.environment === 'development') {
  const express = require('express');
  const YAML = require('yamljs');

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
