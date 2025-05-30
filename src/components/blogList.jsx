import React, { useState } from 'react';
import BlogPost from './blogPost';

export default function BlogList({ posts, onEditPost, onDeletePost }) {
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Asegura que totalPages sea al menos 1, incluso si no hay posts
  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="blog-list">
      {currentPosts.length === 0 ? (
        <p>No hay entradas aún.</p>
      ) : (
        currentPosts.map((post) => (
          <BlogPost
            key={post.id}
            post={post}
            onEdit={() => onEditPost(post)} 
            onDelete={() => onDeletePost(post.id)}
          />
        ))
      )}

      <div className="pagination">
        <button onClick={goToPrevious} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={goToNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}