const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create tracking table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trackingNumber TEXT,
    status TEXT,
    location TEXT
  )
`);

module.exports = db;
