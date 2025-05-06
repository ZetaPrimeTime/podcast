import React, { createContext, useState, useContext } from 'react';

const EpisodesContext = createContext();

export const useEpisodes = () => {
  const context = useContext(EpisodesContext);
  if (!context) {
    throw new Error('useEpisodes must be used within an EpisodesProvider');
  }
  return context;
};

export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([
    {
      id: '1',
      title: 'Getting Started with Podcasting',
      description: 'Learn the basics of starting your own podcast...',
      duration: '45:00',
      date: '2024-03-15',
      coverImage: '/assets/images/episode1.jpg',
      audioUrl: '/assets/audio/episode1.mp3',
    },
  ]);

  const addEpisode = (newEpisode) => {
    const episodeWithId = {
      ...newEpisode,
      id: Date.now().toString(),
      coverImage: '/assets/images/default-episode.jpg', // Default cover image
    };
    setEpisodes(prev => [episodeWithId, ...prev]);
  };

  return (
    <EpisodesContext.Provider value={{ episodes, addEpisode }}>
      {children}
    </EpisodesContext.Provider>
  );
}; 