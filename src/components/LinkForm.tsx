import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from '../App';
import './LinkForm.css';

interface LinkFormProps {
  onAdd: (link: Link) => void;
  onUpdate: (link: Link | null) => void;
  editing: Link | null;
}

interface FormState {
  title: string;
  url: string;
  description: string;
  tags: string;
}

const initialState: FormState = { title: '', url: '', description: '', tags: '' };

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginBottom: '2rem',
  justifyContent: 'center',
};
const inputStyle: React.CSSProperties = {
  flex: '1 1 180px',
  padding: '1rem 1.2rem',
  border: '2px solid #111',
  borderRadius: 10,
  fontSize: '1.13rem',
  outline: 'none',
  background: '#fff',
  color: '#111',
  fontWeight: 500,
  transition: 'border 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
};
const btnStyle: React.CSSProperties = {
  flex: '0 0 auto',
  minWidth: 100,
  background: '#111',
  color: '#fff',
  border: '2px solid #111',
  borderRadius: 10,
  padding: '1rem 1.2rem',
  fontSize: '1.13rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
};
const btnCancelStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#fff',
  color: '#111',
};
function LinkForm({ onAdd, onUpdate, editing }: LinkFormProps) {
  const [form, setForm] = useState<FormState>(initialState);

  useEffect(() => {
    if (editing) {
      setForm({ ...editing, tags: editing.tags ? editing.tags.join(', ') : '' });
    } else {
      setForm(initialState);
    }
  }, [editing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    const link: Link = {
      ...form,
      id: editing ? editing.id : Date.now(),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
    };
    if (editing) onUpdate(link);
    else onAdd(link);
    setForm(initialState);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        style={inputStyle}
      />
      <input
        name="url"
        value={form.url}
        onChange={handleChange}
        placeholder="URL"
        required
        type="url"
        style={inputStyle}
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        style={inputStyle}
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>
        {editing ? 'Update' : 'Add'}
      </button>
      {editing && (
        <button type="button" style={btnCancelStyle} onClick={() => onUpdate(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default LinkForm;
