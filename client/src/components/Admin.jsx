import { useEffect, useState } from 'react';
import { hasApi, createProject, deleteProject, listProjectsRaw } from '../lib/api.js';

const empty = { title: '', description: '', longDescription: '', tags: '', github: '', live: '', image: '' };

const field = 'w-full rounded-xl border border-paper/20 bg-navy px-4 py-3 text-sm outline-none focus:border-sky';

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem('adminKey') || '');
  const [form, setForm] = useState(empty);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => listProjectsRaw().then(setItems).catch(() => setMsg('Could not reach the server.'));
  useEffect(() => { if (hasApi) load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg('');
    try {
      sessionStorage.setItem('adminKey', key);
      await createProject(key, { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) });
      setForm(empty); setMsg('Project added. It is live on your site now.');
      load();
    } catch (err) { setMsg(err.message); }
    setBusy(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await deleteProject(key, id); load(); } catch (err) { setMsg(err.message); }
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-16 text-paper">
      <div className="mx-auto max-w-2xl">
        <a href="#/" onClick={() => setTimeout(() => window.location.reload(), 0)} className="text-sm text-paper/60 underline">Back to site</a>
        <h1 className="mt-6 text-4xl font-semibold">Manage projects</h1>

        {!hasApi ? (
          <p className="mt-6 rounded-2xl border border-brass/40 p-5 text-paper/80">
            The backend is not connected yet. Set <code>VITE_API_URL</code> in <code>client/.env</code> and start the server
            (see README). Until then, add projects by editing <code>src/data/projects.js</code>.
          </p>
        ) : (
          <>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <input className={field} type="password" placeholder="Admin key" value={key} onChange={(e) => setKey(e.target.value)} required />
              <input className={field} placeholder="Project title" value={form.title} onChange={set('title')} required />
              <input className={field} placeholder="Short description (shows on the card)" value={form.description} onChange={set('description')} required />
              <textarea className={field} rows={5} placeholder="Full description (shows in the popup)" value={form.longDescription} onChange={set('longDescription')} />
              <input className={field} placeholder="Tags, separated by commas: React, Node.js" value={form.tags} onChange={set('tags')} />
              <input className={field} placeholder="GitHub link" value={form.github} onChange={set('github')} />
              <input className={field} placeholder="Live site link" value={form.live} onChange={set('live')} />
              <input className={field} placeholder="Image link (optional)" value={form.image} onChange={set('image')} />
              <button disabled={busy} className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink disabled:opacity-60">
                {busy ? 'Adding…' : 'Add project'}
              </button>
              {msg && <p role="status" className="text-sm text-sky">{msg}</p>}
            </form>

            <h2 className="mt-14 text-2xl font-semibold">Live projects</h2>
            <ul className="mt-4 divide-y divide-paper/10">
              {items.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                  <span>{p.title}</span>
                  <button onClick={() => remove(p.id)} className="text-sm text-paper/60 hover:text-paper">Delete</button>
                </li>
              ))}
              {items.length === 0 && <li className="py-3 text-paper/50">Nothing in the database yet.</li>}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
