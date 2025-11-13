'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebase'; // Adjust the path if needed
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/auth';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
}

interface FormState {
  title: string;
  description: string;
  tech: string;
  image: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>({ title: '', description: '', tech: '', image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) router.replace('/admin/login');
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'projects'));
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Project, 'id'>) })));
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Handlers
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, 'projects', editingId), {
        title: form.title,
        description: form.description,
        tech: form.tech.split(',').map((s: string) => s.trim()),
        image: form.image
      });
    } else {
      await addDoc(collection(db, 'projects'), {
        title: form.title,
        description: form.description,
        tech: form.tech.split(',').map((s: string) => s.trim()),
        image: form.image
      });
    }
    setForm({ title: '', description: '', tech: '', image: '' });
    setEditingId(null);
    // Refresh
    const snapshot = await getDocs(collection(db, 'projects'));
    setProjects(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Project, 'id'>) })));
  }

  async function handleEdit(id: string) {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    setForm({
      title: proj.title,
      description: proj.description,
      tech: proj.tech.join(', '),
      image: proj.image || ''
    });
    setEditingId(id);
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, 'projects', id));
    setProjects(projects.filter(p => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <form 
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-8 mb-12 space-y-4 border border-cyan-500/20"
      >
        <h2 className="text-xl font-semibold">{editingId ? 'Edit Project' : 'Add Project'}</h2>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required
          className="w-full px-4 py-2 rounded bg-gray-800 mb-2"/>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required
          className="w-full px-4 py-2 rounded bg-gray-800 mb-2"/>
        <input type="text" name="tech" placeholder="Technologies (comma separated)" value={form.tech} onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 mb-2"/>
        <input type="text" name="image" placeholder="Image/Emoji" value={form.image} onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 mb-2"/>
        <div className="flex gap-4">
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 py-2 px-6 rounded text-white font-bold">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded" onClick={() => {
              setEditingId(null); setForm({ title: '', description: '', tech: '', image: '' });
            }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      {loading 
        ? <p>Loading...</p> 
        : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 rounded-xl p-4 border border-cyan-500/10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
                <div className="text-4xl">{project.image || '🌌'}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech && project.tech.map((t: string) => (
                      <span key={t} className="px-2 py-1 bg-cyan-600/30 rounded text-cyan-400 text-xs">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleEdit(project.id)} className="bg-blue-500 px-3 py-1 rounded text-white">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
export {};