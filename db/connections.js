// Import and require mysql2
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: 'Nygiants13',
      database: 'office_db'
    },
    
  );
  module.exports = db;