const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./instagram.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the in-memory SQlite Database.');
});

db.run("CREATE TABLE IF NOT EXISTS users(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "username VARCHAR(20) UNIQUE," +
    "password VARCHAR(20)" +
    ");" +

    "CREATE TABLE IF NOT EXISTS photos(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "userid INTEGER," +
    "FOREIGN KEY(userid) REFERENCES users(id)," +
    ");"

    ,
    function(err) {
      if (err)
        throw err;
      console.log("Created tables if it didn't exist already")
    });

module.exports = db;
