import React, { useState, useEffect } from 'react';
import BlogList from './components/blogList';
import NewPostForm from './components/newPostForm';
import SearchBar from './components/searchBar';
import { loadPosts, savePosts } from './utils/storage'; // Importa las funciones de storage
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // Nuevo estado para el post que se está editando
  const [showNewPostForm, setShowNewPostForm] = useState(false); // Nuevo estado para mostrar/ocultar el formulario

  // Cargar posts y preferencia de modo oscuro desde localStorage al montar el componente
  useEffect(() => {
    const storedPosts = loadPosts();
    setPosts(storedPosts);

    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
    document.body.className = storedMode ? 'dark' : '';
  }, []);

  // Guardar posts en localStorage cada vez que cambien
  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  // Guardar preferencia modo oscuro en localStorage y actualizar clase body
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  // Manejar búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filtrar posts según búsqueda
  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery)
    );
  });

  // Añadir o editar post
  const handleSavePost = (postToSave) => {
    if (editingPost) {
      // Si estamos editando, actualizamos el post existente
      setPosts(posts.map(post => post.id === postToSave.id ? postToSave : post));
      setEditingPost(null); // Salir del modo edición
    } else {
      // Si no estamos editando, añadimos un nuevo post
      const postWithId = { ...postToSave, id: Date.now() };
      setPosts([postWithId, ...posts]);
    }
    setShowNewPostForm(false); // Ocultar el formulario después de guardar
  };

  // Borrar post por id
  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Manejar la edición de un post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowNewPostForm(true); // Mostrar el formulario para editar
  };

  // Cancelar la edición o la creación de un nuevo post
  const handleCancelForm = () => {
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  return (
    <div className="App">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mi Blog</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </header>

      <div className="container">
        <SearchBar onSearch={handleSearch} />

        <button onClick={() => setShowNewPostForm(true)} style={{ marginBottom: '1rem' }}>
          Crear Nuevo Post
        </button>

        {showNewPostForm && (
          <NewPostForm
            onSave={handleSavePost}
            initialData={editingPost || {}} // Pasa los datos del post a editar, o un objeto vacío para un nuevo post
            onCancel={handleCancelForm}
          />
        )}

        <BlogList
          posts={filteredPosts}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
        />
      </div>
    </div>
  );
}

export default App;