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
    try {
      localStorage.setItem('podcast-episode-order', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save episode order:', error);
    }
  };

  const loadSavedOrder = async () => {
    try {
      const savedOrder = localStorage.getItem('podcast-episode-order');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        // Only update if we have valid episodes data
        if (Array.isArray(parsedOrder) && parsedOrder.length > 0) {
          setEpisodes(parsedOrder);
        }
      }
    } catch (error) {
      console.error('Failed to load saved episode order:', error);
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