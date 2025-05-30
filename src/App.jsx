// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePostPage from './components/CreatePostPage';
import PostsPage from './components/PostsPage';
import { loadPosts, savePosts } from './utils/storage';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
    document.body.className = storedMode ? 'dark' : '';
  }, []);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleSavePost = (postToSave) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === postToSave.id ? postToSave : p));
      setEditingPost(null);
    } else {
      const newPost = { ...postToSave, id: Date.now() };
      setPosts([newPost, ...posts]);
    }
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery) ||
    post.content.toLowerCase().includes(searchQuery)
  );

  return (
    <Router>
      <div className="App">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Mi Blog</h1>
          <div>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
            <nav style={{ marginLeft: '1rem', display: 'inline-block' }}>
              <Link to="/" style={{ margin: '0 0.5rem' }}>Ver Posts</Link>
              <Link to="/crear" style={{ margin: '0 0.5rem' }}>Crear Post</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <PostsPage
                posts={filteredPosts}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/crear"
            element={
              <CreatePostPage
                onSave={handleSavePost}
                initialData={editingPost || {}}
                onCancel={() => setEditingPost(null)}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
