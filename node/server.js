let sqlite = require('sqlite3').verbose();
let express = require('express');
let bodyparser = require('body-parser');
let db = require('./database.js');
let app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, cache-control');
    return next();
});

const port = 8000;
app.use((req, res, next) => {
  console.log('server in use');
  next();
});

app.use('/', router);
server = app.listen(port);
console.log('Express server listening on port %d in %s mode.', port, app.settings.env);
