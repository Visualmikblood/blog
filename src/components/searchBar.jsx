import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Llama a la función padre con el texto del buscador
  };

  return (
    <input
      type="text"
      placeholder="Buscar posts..."
      value={query}
      onChange={handleChange}
      style={{ width: '100%', padding: '8px', marginBottom: '1rem', fontSize: '1em' }}
    />
  );
}
