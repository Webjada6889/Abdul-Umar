const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// === PROJECTS API ===
app.get('/api/projects', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY year DESC').all();
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const { title, category, year, description, image, tags, link } = req.body;
  const stmt = db.prepare(`
    INSERT INTO projects (title, category, year, description, image, tags, link)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(title, category, year, description, image, tags, link);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, category, year, description, image, tags, link } = req.body;
  db.prepare(`
    UPDATE projects SET title=?, category=?, year=?, description=?, image=?, tags=?, link=?
    WHERE id=?
  `).run(title, category, year, description, image, tags, link, id);
  res.json({ success: true });
});

app.delete('/api/projects/:id', (req, res) => {
  db.prepare('DELETE FROM projects WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

// Contact Form (from previous version)
app.post('/api/contact', /* ... same as before ... */);

app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard → http://localhost:${PORT}/admin.html`);
});