# Aryan Kumar | Portfolio

A personal portfolio website with a 3D avatar, particle-built name, inertia scrolling, and a project gallery that grows as you add projects. Built with the MERN stack and Tailwind CSS.

Live site: _add your Vercel link here after deploying_

## Features

- **Particle name.** The hero name is drawn from thousands of dots that scatter away from the cursor and drift apart as you scroll.
- **3D avatar.** A character built from CSS 3D blocks that turns a full 360 degrees. Drag sideways to spin it. Drop in your own `avatar.png` and it switches to a photo that tilts toward the cursor.
- **Inertia scrolling.** The page keeps gliding for a moment after you stop scrolling (powered by [Lenis](https://lenis.darkroom.engineering/)).
- **Scroll-driven reveals.** The About and Contact sections open from a circle, and their words slide up out of a mask.
- **Skills constellation.** An interactive canvas where skills drift, link up, and are pulled toward the cursor.
- **Dynamic project gallery.** Cards fan in from different sides, tilt in 3D on hover, open in a detail popup, and can be filtered by tag. Add as many projects as you like.
- **Optional admin page.** Add and delete projects from the browser at `/#/admin`, stored in MongoDB, with no code changes.
- **Responsive and accessible.** Works from phone to desktop, keyboard focusable, and every animation switches off for visitors who have "reduce motion" enabled.

## Tech stack

| Part | Tools |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS v4, Lenis |
| Backend (optional) | Node.js, Express, MongoDB with Mongoose |
| Deployment | Vercel (client), Render or Railway (server), MongoDB Atlas (database) |

## Project structure

```
aryan-portfolio/
├── client/                  React + Vite frontend (this is the website)
│   ├── public/              Static files: avatar.png, project images
│   └── src/
│       ├── components/      Hero, About, Skills, Projects, Contact, Admin ...
│       ├── data/
│       │   ├── profile.js   Your name, bio, skills, experience, links
│       │   └── projects.js  Your projects
│       ├── hooks/           Scroll progress, in-view, reduced motion
│       └── lib/             API helper, scroll helper, image link helper
└── server/                  Express + MongoDB API (optional)
    ├── models/Project.js
    └── index.js
```

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone https://github.com/Aryankumarbarnwal/Aryan_Portfolio.git
cd Aryan_Portfolio/client
npm install
npm run dev
```

Open http://localhost:5173. The site works fully without the backend.

### Scripts (inside `client/`)

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Creates a production build in `client/dist` |
| `npm run preview` | Serves the production build locally |

## Customizing the content

| What to change | Where |
| --- | --- |
| Name, intro, stats, experience, skills, email, GitHub, LinkedIn | `client/src/data/profile.js` |
| Projects | `client/src/data/projects.js` (or the admin page) |
| Avatar photo | `client/public/avatar.png` |
| Colors and fonts | `client/src/index.css` (the `@theme` block) |

## Adding projects

### Option A: edit a file (no backend needed)

Open `client/src/data/projects.js`, copy a block, paste it at the end of the array, and edit the text. A card, a tag filter button, and a popup are created for every project.

```js
{
  id: 'my-app',
  title: 'My App',
  description: 'One or two lines that fit on the card.',
  longDescription: 'The full story, shown in the popup.',
  tags: ['React', 'Node.js'],
  github: 'https://github.com/your-username/my-app',
  live: 'https://my-app.vercel.app',
  image: '/projects/my-app.png',
  images: ['/projects/my-app-1.png', '/projects/my-app-2.png'],
}
```

**Images.** The most reliable way is to put image files in `client/public/projects/` and refer to them as `/projects/name.png` (do not write `public` in the path). Use lowercase names without spaces, for example `school-1.png`. Google Drive share links also work (the file must be shared as "Anyone with the link"), but local files load faster and never break.

Keep tag spelling consistent across projects (use `React`, not both `React` and `React.js`), because the filter buttons are built from the tags.

### Option B: the admin page (needs the backend)

1. Create a free database on [MongoDB Atlas](https://www.mongodb.com/atlas), or run MongoDB locally.
2. Start the server:

   ```bash
   cd server
   cp .env.example .env     # then fill in the values below
   npm install
   npm run dev
   ```

3. In `client/`, copy `.env.example` to `.env` and set `VITE_API_URL=http://localhost:5000`, then restart the client.
4. Open `http://localhost:5173/#/admin`, enter your admin key, fill in the form, and click **Add project**. It appears on the site right away.

When the database has no projects, the site falls back to `client/src/data/projects.js`, so the gallery is never empty.

## Environment variables

**`server/.env`**

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `ADMIN_KEY` | Secret you type on the admin page to add or delete projects |
| `PORT` | Server port (default `5000`) |
| `CLIENT_ORIGIN` | Allowed frontend URL(s), comma separated |

**`client/.env`**

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | URL of your server. Leave empty to use `projects.js` only |

Never commit `.env` files. They are already listed in `.gitignore`.

## API

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/projects` | Public | List all projects, newest first |
| POST | `/api/projects` | `x-admin-key` header | Create a project |
| PUT | `/api/projects/:id` | `x-admin-key` header | Update a project |
| DELETE | `/api/projects/:id` | `x-admin-key` header | Delete a project |
| GET | `/api/health` | Public | Health check |

## Deployment

**Frontend on Vercel**

1. Import this repository on [vercel.com](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. If you use the backend, add the environment variable `VITE_API_URL` with your server URL.

**Backend on Render or Railway (optional)**

1. Create a new web service from this repository with the root directory set to `server`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add the server environment variables listed above. Set `CLIENT_ORIGIN` to your Vercel URL.

## Browser support

Works in current versions of Chrome, Edge, Firefox, and Safari. The scroll-driven reveals use modern CSS (`clip-path`, `clamp()` inside `calc()`), so very old browsers may show a simpler version.

## Author

**Aryan Kumar**, B.Tech CSE graduate and software developer.

- GitHub: [@Aryankumarbarnwal](https://github.com/Aryankumarbarnwal)
- LinkedIn: _add your link_
- Email: _add your email_
