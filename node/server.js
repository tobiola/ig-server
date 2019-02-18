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

app.get('/login/:username?:password?', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let query = 'SELECT id FROM users WHERE username=? AND password=?;';

  db.run(query, [username, password], (err, pictures) => {
    if (err) {
      console.log(err.message);
      res.send('error finding user');
    }
    else {
      console.log('logged in');
      res.send(pictures);
    }
  });
});

app.post('/create/:username?:password?', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let query = 'INSERT INTO users (username, password) VALUES(?,?);';

  db.run(query, [username, password], (err) => {
    if (err) {
      console.log('user already exists');
      res.send('user already exists');
    }
    else {
      console.log('user created');
      res.send('user created');
    }

    return;
  });
});

app.post('/upload/', (req, res) => {

  // Lol this gonna be hard

});

var server = app.listen(port, () => {
  console.log('server running at http://localhost:%s', port);
});
