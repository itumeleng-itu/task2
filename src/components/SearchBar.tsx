import React from 'react';
import type { ChangeEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const searchBarStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem 1.2rem',
  marginBottom: '1.5rem',
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

function SearchBar({ search, setSearch }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <input
      style={searchBarStyle}
      type="text"
      placeholder="Search by title, URL, description, or tags..."
      value={search}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
