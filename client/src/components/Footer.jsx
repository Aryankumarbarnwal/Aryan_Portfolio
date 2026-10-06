import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-8 text-center text-sm text-paper/50">
      {new Date().getFullYear()} {profile.name}. Built with React, Tailwind CSS and a lot of dots.
    </footer>
  );
}
