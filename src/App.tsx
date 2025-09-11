
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';
import './dashboard.css';


export interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
}


function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = localStorage.getItem('currentUser');
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function MainApp() {
  const [links, setLinks] = useState<Link[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Link | null>(null);
  const [notification, setNotification] = useState('');
  const [activeCrud, setActiveCrud] = useState<'create' | 'read' | 'update' | 'delete'>('read');
  const username = localStorage.getItem('currentUser') || '';
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarkLinks');
    if (stored) setLinks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkLinks', JSON.stringify(links));
  }, [links]);

  const handleAdd = (link: Link) => {
    setLinks([...links, link]);
    setNotification('Link added!');
    setTimeout(() => setNotification(''), 2000);
  };

  const handleDelete = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
    setNotification('Link deleted!');
    setTimeout(() => setNotification(''), 2000);
  };

  const handleEdit = (id: number) => {
    setEditing(links.find(l => l.id === id) || null);
  };

  const handleUpdate = (updated: Link | null) => {
    if (!updated) {
      setEditing(null);
      return;
    }
    setLinks(links.map(l => l.id === updated.id ? updated : l));
    setEditing(null);
    setNotification('Link updated!');
    setTimeout(() => setNotification(''), 2000);
  };

  const filteredLinks = links.filter(link => {
    const q = search.toLowerCase();
    return (
      link.title.toLowerCase().includes(q) ||
      link.url.toLowerCase().includes(q) ||
      link.description.toLowerCase().includes(q) ||
      (link.tags && link.tags.join(' ').toLowerCase().includes(q))
    );
  });

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  return (
    <div className="dashboard">
    <div className="systemname">LINK TRACKER</div>
      <header className="header">
        <div className="headerLeft">
          <div className="UserGreeting">Hello, {username}</div>
        </div>
        <div className="headerRight">
          <span className="time"><strong>{currentTime}</strong></span>
          <button className="logoutBtn" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="dashboardCrud">
        <div className="crudItems">
          <div className={`crudBox${activeCrud === 'create' ? ' active' : ''}`} onClick={() => setActiveCrud('create')}>
            <span role="img" aria-label="Create" style={{fontSize: '1.7em', display: 'block', marginBottom: '0.3em'}}>➕</span>
            Create
          </div>
          <div className={`crudBox${activeCrud === 'read' ? ' active' : ''}`} onClick={() => setActiveCrud('read')}>
            <span role="img" aria-label="Read" style={{fontSize: '1.7em', display: 'block', marginBottom: '0.3em'}}>📖</span>
            Read
          </div>
          <div className={`crudBox${activeCrud === 'update' ? ' active' : ''}`} onClick={() => setActiveCrud('update')}>
            <span role="img" aria-label="Update" style={{fontSize: '1.7em', display: 'block', marginBottom: '0.3em'}}>✏️</span>
            Update
          </div>
          <div className={`crudBox${activeCrud === 'delete' ? ' active' : ''}`} onClick={() => setActiveCrud('delete')}>
            <span role="img" aria-label="Delete" style={{fontSize: '1.7em', display: 'block', marginBottom: '0.3em'}}>🗑️</span>
            Delete
          </div>
        </div>
        {activeCrud === 'create' && (
          <section className="operations">
            <div className="operationsTitle">ADD LINK</div>
            <form
              className="link-form"
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const url = (form.elements.namedItem('url') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLInputElement).value;
                const tags = (form.elements.namedItem('tags') as HTMLInputElement).value;
                if (!title || !url) return;
                const link: Link = {
                  id: Date.now(),
                  title,
                  url,
                  description,
                  tags: tags ? tags.split(',').map(t => t.trim()) : [],
                };
                handleAdd(link);
                form.reset();
              }}
            >
              <input name="title" placeholder="Title" required />
              <input name="url" placeholder="URL" required type="url" />
              <input name="description" placeholder="Description" />
              <input name="tags" placeholder="Tags (comma separated)" />
              <button type="submit" className="btn">Add</button>
            </form>
          </section>
        )}
        {activeCrud === 'read' && (
          <section className="dashboard-section">
            <div className="dashboard-section-title">All Links</div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                className="search-bar"
                type="text"
                placeholder="Search by title, URL, description, or tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="link-card-list">
              {filteredLinks.length === 0 ? (
                <div className="empty">No links found.</div>
              ) : (
                filteredLinks.map(link => (
                  <div className="link-card" key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-card-title">
                      {link.title}
                    </a>
                    <div className="link-card-desc">{link.description}</div>
                    {link.tags && link.tags.length > 0 && (
                      <div className="link-card-tags">
                        {link.tags.map((tag, i) => (
                          <span className="link-card-tag" key={i}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        )}
        {activeCrud === 'update' && (
          <section className="dashboard-section">
            <div className="dashboard-section-title">Update Link</div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                className="search-bar"
                type="text"
                placeholder="Search links to update..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="link-card-list">
              {filteredLinks.length === 0 ? (
                <div className="empty">No links to update.</div>
              ) : (
                filteredLinks.map(link => (
                  <div className="link-card" key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-card-title">
                      {link.title}
                    </a>
                    <div className="link-card-desc">{link.description}</div>
                    {link.tags && link.tags.length > 0 && (
                      <div className="link-card-tags">
                        {link.tags.map((tag, i) => (
                          <span className="link-card-tag" key={i}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="link-card-actions">
                      <button className="link-card-btn" onClick={() => setEditing(link)}>Edit</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {editing && (
              <form
                className="link-form"
                style={{ marginTop: '1.5rem' }}
                onSubmit={e => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                  const url = (form.elements.namedItem('url') as HTMLInputElement).value;
                  const description = (form.elements.namedItem('description') as HTMLInputElement).value;
                  const tags = (form.elements.namedItem('tags') as HTMLInputElement).value;
                  if (!title || !url) return;
                  const updated: Link = {
                    id: editing.id,
                    title,
                    url,
                    description,
                    tags: tags ? tags.split(',').map(t => t.trim()) : [],
                  };
                  handleUpdate(updated);
                  form.reset();
                }}
              >
                <input name="title" placeholder="Title" required defaultValue={editing.title} />
                <input name="url" placeholder="URL" required type="url" defaultValue={editing.url} />
                <input name="description" placeholder="Description" defaultValue={editing.description} />
                <input name="tags" placeholder="Tags (comma separated)" defaultValue={editing.tags?.join(', ') || ''} />
                <button type="submit" className="btn">Update</button>
                <button type="button" className="btn cancel" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            )}
          </section>
        )}
        {activeCrud === 'delete' && (
          <section className="dashboard-section">
            <div className="dashboard-section-title">Delete Link</div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                className="search-bar"
                type="text"
                placeholder="Search links to delete..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="link-card-list">
              {filteredLinks.length === 0 ? (
                <div className="empty">No links to delete.</div>
              ) : (
                filteredLinks.map(link => (
                  <div className="link-card" key={link.id}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-card-title">
                      {link.title}
                    </a>
                    <div className="link-card-desc">{link.description}</div>
                    {link.tags && link.tags.length > 0 && (
                      <div className="link-card-tags">
                        {link.tags.map((tag, i) => (
                          <span className="link-card-tag" key={i}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="link-card-actions">
                      <button className="link-card-btn delete" onClick={() => handleDelete(link.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
        {notification && <div className="notification">{notification}</div>}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/*" element={<RequireAuth><MainApp /></RequireAuth>} />
    </Routes>
  );
}

