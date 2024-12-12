const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "34.101.133.228",
  user: "root",
  password: "123454321",
  database: "user",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = connection;
