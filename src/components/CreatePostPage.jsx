// src/components/CreatePostPage.jsx
import React from 'react';
import NewPostForm from './newPostForm';

const CreatePostPage = ({ onSave, initialData, onCancel }) => {
  return (
    <div className="container">
      <h2>Crear o Editar Post</h2>
      <NewPostForm
        onSave={onSave}
        initialData={initialData}
        onCancel={onCancel}
      />
    </div>
  );
};

export default CreatePostPage;
