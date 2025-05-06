import React, { createContext, useState, useContext, useEffect } from 'react';
import testAudio from '../assets/test-audio.mp3';
import defaultBg from '../assets/ussr disco.png';

const EpisodesContext = createContext();

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

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
      duration: '0:00', // Will be updated when audio loads
      date: '2024-03-15',
      coverImage: defaultBg,
      audioUrl: testAudio,
    },
  ]);

  // Update duration for the default episode
  useEffect(() => {
    const audio = new Audio(testAudio);
    audio.addEventListener('loadedmetadata', () => {
      setEpisodes(prev => prev.map(episode => 
        episode.id === '1' 
          ? { ...episode, duration: formatTime(audio.duration) }
          : episode
      ));
    });
  }, []);

  const addEpisode = (newEpisode) => {
    const episodeWithId = {
      ...newEpisode,
      id: Date.now().toString(),
      coverImage: defaultBg, // Use the USSR disco background as default
    };
    setEpisodes(prev => [episodeWithId, ...prev]);
  };

  return (
    <EpisodesContext.Provider value={{ episodes, addEpisode }}>
      {children}
    </EpisodesContext.Provider>
  );
}; 