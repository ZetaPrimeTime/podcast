import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
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
  const [isLoading, setIsLoading] = useState(true);

  // Update episodes when context episodes change
  useEffect(() => {
    setEpisodes(contextEpisodes);
    setIsLoading(false);
  }, [contextEpisodes, setEpisodes]);

  useEffect(() => {
    const loadEpisodes = async () => {
      await loadSavedOrder();
      setIsLoading(false);
    };
    loadEpisodes();
  }, [loadSavedOrder]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

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
        <Box sx={{ minHeight: '100px' }}>
          <Droppable droppableId="episodes">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  minHeight: episodes && episodes.length > 0 ? 'auto' : '200px'
                }}
              >
                {episodes && episodes.length > 0 ? (
                  episodes.map((episode, index) => (
                    <EpisodeCard
                      key={episode.id}
                      episode={episode}
                      index={index}
                    />
                  ))
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      No episodes available. Upload your first episode to get started!
                    </Typography>
                  </Box>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default Episodes; 