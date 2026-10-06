import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Project from './models/Project.js';

const app = express();
const origins = process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',').map((s) => s.trim()) : true;
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '1mb' }));

// Only you can change projects: the admin page sends your secret key.
function requireAdmin(req, res, next) {
  const key = req.header('x-admin-key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Wrong admin key.' });
  }
  next();
}

const pick = (b) => ({
  title: b.title,
  description: b.description,
  longDescription: b.longDescription,
  tags: Array.isArray(b.tags) ? b.tags : [],
  github: b.github,
  live: b.live,
  image: b.image,
  images: Array.isArray(b.images) ? b.images : [],
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Public: the website reads projects from here. Newest first.
app.get('/api/projects', async (_req, res) => {
  try {
    res.json(await Project.find().sort({ createdAt: -1 }));
  } catch {
    res.status(500).json({ error: 'Could not load projects.' });
  }
});

app.post('/api/projects', requireAdmin, async (req, res) => {
  try {
    res.status(201).json(await Project.create(pick(req.body)));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/projects/:id', requireAdmin, async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Project not found.' });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/projects/:id', requireAdmin, async (req, res) => {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Project not found.' });
    res.json({ deleted: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API running on http://localhost:${port}`)))
  .catch((e) => { console.error('MongoDB connection failed:', e.message); process.exit(1); });
