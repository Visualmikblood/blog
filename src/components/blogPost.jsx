import React, { useState } from 'react';

export default function BlogPost({ post, onEdit, onDelete }) {

  console.log(post.content);


  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState(0);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="blog-post" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      <h2>{post.title}</h2>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="blog-image"
          style={{ maxWidth: "100%", marginBottom: "1rem" }}
        />
      )}

      {/* Aquí usamos dangerouslySetInnerHTML para contenido HTML */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <p><strong>Categoría:</strong> {post.category}</p>

      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={onEdit} style={{ marginRight: "0.5rem" }}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
      </div>

      {/* Me gusta */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleLike}>❤️ Me gusta ({likes})</button>
      </div>

      {/* Comentarios */}
      <div style={{ marginTop: "1rem" }}>
        <h4>Comentarios</h4>
        {comments.map((comment, index) => (
          <p key={index} style={{ marginLeft: "1rem" }}>- {comment}</p>
        ))}
        <div style={{ marginTop: "0.5rem" }}>
          <input
            type="text"
            placeholder="Añadir comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment} style={{ marginLeft: "0.5rem" }}>Comentar</button>
        </div>
      </div>
    </div>
  );
}
