import React, { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Behind the Scenes: Our Podcast Setup',
      content: 'In this post, we dive deep into our podcast recording setup, from microphones to software...',
      author: 'John Doe',
      date: '2024-03-20',
      imageUrl: '../assets/images/default-blog.jpg',
      tags: ['Equipment', 'Tutorial'],
      excerpt: 'Discover the professional equipment and setup we use to create high-quality podcast episodes.',
    },
  ]);

  const addPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      imageUrl: '../assets/images/default-blog.jpg',
    };
    setPosts(prev => [postWithId, ...prev]);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost }}>
      {children}
    </BlogContext.Provider>
  );
}; 