import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPostForm = ({ onSave, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [image, setImage] = useState(initialData.image || null);
  const [category, setCategory] = useState(initialData.category || '');

  useEffect(() => {
    setTitle(initialData.title || '');
    setContent(initialData.content || '');
    setImage(initialData.image || null);
    setCategory(initialData.category || '');
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const postToSave = {
      id: initialData.id,
      title,
      content,
      image,
      category
    };

    onSave(postToSave);

    // Solo limpiar si no estamos editando
    if (!initialData.id) {
      setTitle('');
      setContent('');
      setImage(null);
      setCategory('');
    }
  };

  // Configuración simplificada sin el módulo problemático
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image'
  ];

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>{initialData.id ? 'Editar Post' : 'Nuevo Post'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Contenido:</label>
          <div style={{ marginTop: '0.25rem' }}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              style={{ height: '200px', marginBottom: '3rem' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Categoría:</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="">Selecciona una categoría</option>
            <option value="tecnologia">Tecnología</option>
            <option value="viajes">Viajes</option>
            <option value="salud">Salud</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '0.25rem' }}
          />
        </div>

        {image && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Previsualización:</strong>
            <img src={image} alt="preview" style={{ maxWidth: '100%', marginTop: '0.5rem', display: 'block' }} />
          </div>
        )}

        <div>
          <button type="submit" style={{ marginRight: '0.5rem' }}>
            {initialData.id ? 'Actualizar' : 'Guardar'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;