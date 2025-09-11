import React from 'react';
import LinkItem from './LinkItem';
import './LinkList.css';
import { Link } from '../App';

interface LinkListProps {
  links: Link[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const linkListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
};
const emptyStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#111',
  margin: '2.5rem 0',
  fontSize: '1.13rem',
  fontWeight: 600,
};
function LinkList({ links, onDelete, onEdit }: LinkListProps) {
  if (!links.length) return <div style={emptyStyle}>No links found.</div>;
  return (
    <div style={linkListStyle}>
      {links.map(link => (
        <LinkItem key={link.id} link={link} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default LinkList;
