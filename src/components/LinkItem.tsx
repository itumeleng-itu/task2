import React from 'react';
import './LinkItem.css';
import { Link } from '../App';

interface LinkItemProps {
  link: Link;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const linkItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  background: '#fff',
  borderRadius: '1.2rem',
  padding: '1.2rem',
  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  border: '2px solid #111',
  transition: 'box-shadow 0.2s, border 0.2s',
};
const linkMainStyle: React.CSSProperties = { flex: '1 1 auto' };
const linkTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  color: '#111',
  textDecoration: 'none',
  fontSize: '1.13rem',
  marginRight: '0.5rem',
  transition: 'color 0.2s',
};
const linkDescStyle: React.CSSProperties = {
  display: 'block',
  color: '#222',
  margin: '0.2rem 0 0.4rem 0',
  fontSize: '1rem',
};
const linkTagsStyle: React.CSSProperties = { marginTop: '0.2rem' };
const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  background: '#fff',
  color: '#111',
  borderRadius: 4,
  padding: '0.1rem 0.5rem',
  marginRight: '0.3rem',
  fontSize: '0.92rem',
  border: '1.5px solid #111',
};
const linkActionsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
};
const btnStyle: React.CSSProperties = {
  background: '#111',
  color: '#fff',
  border: '2px solid #111',
  borderRadius: 8,
  padding: '0.5rem 1.1rem',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
  margin: 0,
};
const btnDeleteStyle: React.CSSProperties = {
  ...btnStyle,
  background: '#fff',
  color: '#111',
};
function LinkItem({ link, onDelete, onEdit }: LinkItemProps) {
  return (
    <div style={linkItemStyle}>
      <div style={linkMainStyle}>
        <a href={link.url} target="_blank" rel="noopener noreferrer" style={linkTitleStyle}>
          {link.title}
        </a>
        <span style={linkDescStyle}>{link.description}</span>
        {link.tags && link.tags.length > 0 && (
          <div style={linkTagsStyle}>
            {link.tags.map((tag: string, i: number) => (
              <span style={tagStyle} key={i}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div style={linkActionsStyle}>
        <button style={btnStyle} onClick={() => onEdit(link.id)} title="Edit">✏️</button>
        <button style={btnDeleteStyle} onClick={() => onDelete(link.id)} title="Delete">🗑️</button>
      </div>
    </div>
  );
}

export default LinkItem;
