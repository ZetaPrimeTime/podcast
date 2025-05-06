import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import AudioControls from './AudioControls';
import { styled } from '@mui/material/styles';

const StyledCard = styled(motion.div)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EpisodeCard = ({ episode, index }) => {
  return (
    <Draggable draggableId={episode.id} index={index}>
      {(provided, snapshot) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.9 : 1,
          }}
        >
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={episode.coverImage}
              alt={episode.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {episode.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {episode.description}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 1
              }}>
                <AudioControls
                  audioUrl={episode.audioUrl}
                  episodeId={episode.id}
                />
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 0.5
                }}>
                  <Typography variant="caption" color="text.secondary">
                    Duration: {episode.duration}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(episode.date)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </StyledCard>
      )}
    </Draggable>
  );
};

export default EpisodeCard; 