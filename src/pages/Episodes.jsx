import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import EpisodeCard from '../components/EpisodeCard';
import useCardPosition from '../hooks/useCardPosition';
import { useEpisodes } from '../context/EpisodesContext';

// Sample data - replace with your actual data source
const initialEpisodes = [
  {
    id: '1',
    title: 'Getting Started with Podcasting',
    description: 'Learn the basics of starting your own podcast...',
    duration: '45:00',
    date: 'Mar 15, 2024',
    coverImage: '/assets/images/episode1.jpg',
    audioUrl: '/assets/audio/episode1.mp3',
  },
  // Add more episodes as needed
];

const Episodes = () => {
  const { episodes: contextEpisodes } = useEpisodes();
  const { episodes, handleDragEnd, loadSavedOrder, setEpisodes } = useCardPosition(contextEpisodes);

  // Update episodes when context episodes change
  useEffect(() => {
    setEpisodes(contextEpisodes);
  }, [contextEpisodes, setEpisodes]);

  useEffect(() => {
    loadSavedOrder();
  }, [loadSavedOrder]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Latest Episodes
        </Typography>
      </motion.div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="episodes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {episodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Episodes; 