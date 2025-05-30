// PostList.jsx
import React from 'react';

const PostList = ({ posts, onEdit }) => {
  return (
    <div className="post-list">
      <h2>Posts creados</h2>
      {posts.length === 0 ? (
        <p>No hay posts creados aún.</p>
      ) : (
        posts.map((post, index) => (
          <div className="post-card" key={index}>
            <h3>{post.title}</h3>
            {post.image && (
              <img src={post.image} alt={Imagen destacada de ${post.title}} className="post-image" />
            )}
            <p><strong>Categoría:</strong> {post.category || 'Sin categoría'}</p>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <button onClick={() => onEdit(post, index)}>Editar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;