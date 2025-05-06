import { useState } from 'react';

const useCardPosition = (initialEpisodes) => {
  const [episodes, setEpisodes] = useState(initialEpisodes);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(episodes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEpisodes(items);
    
    // Save order to localStorage
    localStorage.setItem('podcast-episode-order', JSON.stringify(items));
  };

  const loadSavedOrder = () => {
    const savedOrder = localStorage.getItem('podcast-episode-order');
    if (savedOrder) {
      setEpisodes(JSON.parse(savedOrder));
    }
  };

  return {
    episodes,
    setEpisodes,
    handleDragEnd,
    loadSavedOrder,
  };
};

export default useCardPosition; 