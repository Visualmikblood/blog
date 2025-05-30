import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostEditor({ initialContent = '', onSave }) {
  const [content, setContent] = useState(initialContent);

  return (
    <div>
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={() => onSave(content)}>Guardar</button>
    </div>
  );
}
