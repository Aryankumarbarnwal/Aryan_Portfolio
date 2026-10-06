import { projects as localProjects } from '../data/projects.js';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const hasApi = Boolean(API);

const normalize = (p) => ({
  id: p._id || p.id,
  title: p.title,
  description: p.description || '',
  longDescription: p.longDescription || '',
  tags: p.tags || [],
  github: p.github || '',
  live: p.live || '',
  image: p.image || '',
  images: p.images || [],
});

// Uses the backend when VITE_API_URL is set and it has projects.
// Otherwise falls back to src/data/projects.js, so the site never looks empty.
export async function getProjects() {
  if (!API) return localProjects;
  try {
    const res = await fetch(`${API}/api/projects`);
    if (!res.ok) throw new Error('bad response');
    const data = await res.json();
    return data.length ? data.map(normalize) : localProjects;
  } catch {
    return localProjects;
  }
}

async function send(path, method, key, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const createProject = (key, data) => send('/api/projects', 'POST', key, data);
export const deleteProject = (key, id) => send(`/api/projects/${id}`, 'DELETE', key);
export async function listProjectsRaw() {
  const res = await fetch(`${API}/api/projects`);
  if (!res.ok) throw new Error('Could not load projects');
  return (await res.json()).map(normalize);
}
