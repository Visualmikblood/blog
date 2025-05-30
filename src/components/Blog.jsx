import React, { useState } from 'react';
import NewPostForm from './newPostForm';
import PostList from './postList';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const handleSave = (post) => {
    if (editingIndex !== null) {
      // Editar post existente
      const updatedPosts = [...posts];
      updatedPosts[editingIndex] = post;
      setPosts(updatedPosts);
      setEditingIndex(null);
      setEditingPost(null);
    } else {
      // Nuevo post
      setPosts([...posts, post]);
    }
  };

  const handleEdit = (post, index) => {
    setEditingPost(post);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // opcional: desplazar arriba para ver el editor
  };

  const handleCancel = () => {
    setEditingPost(null);
    setEditingIndex(null);
  };

  return (
    <div className="blog-container">
      <div className="editor-section">
        <NewPostForm
          onSave={handleSave}
          initialData={editingPost || {}}
          onCancel={handleCancel}
        />
      </div>
      <div className="posts-section">
        <PostList posts={posts} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Blog;