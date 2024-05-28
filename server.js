const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: '',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  );