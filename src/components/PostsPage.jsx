// src/components/PostsPage.jsx
import React from 'react';
import BlogList from './blogList';
import SearchBar from './searchBar';

const PostsPage = ({ posts, onEditPost, onDeletePost, onSearch }) => {
  return (
    <div className="container">
      <h2>Posts Publicados</h2>
      <SearchBar onSearch={onSearch} />
      <BlogList
        posts={posts}
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
      />
    </div>
  );
};

export default PostsPage;
