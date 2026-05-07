const Database = require('better-sqlite3');
const db = new Database('projects.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT,
    year TEXT,
    description TEXT,
    image TEXT,
    tags TEXT,
    link TEXT
  )
`);

module.exports = db;