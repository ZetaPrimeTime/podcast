import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Draggable } from 'react-beautiful-dnd';
import AudioControls from './AudioControls';
import { styled, keyframes } from '@mui/material/styles';
import defaultBg from '../assets/ussr disco.png';

const moveComet = keyframes`
  0% {
    background-position: 100% 0;
    clip-path: inset(-2px -2px calc(100% - 2px) -2px); /* Start at top */
  }
  25% {
    background-position: 100% 100%;
    clip-path: inset(-2px -2px -2px calc(100% - 2px)); /* Right side */
  }
  50% {
    background-position: 0 100%;
    clip-path: inset(calc(100% - 2px) -2px -2px -2px); /* Bottom */
  }
  75% {
    background-position: 0 0;
    clip-path: inset(-2px calc(100% - 2px) -2px -2px); /* Left side */
  }
  100% {
    background-position: 100% 0;
    clip-path: inset(-2px -2px calc(100% - 2px) -2px); /* Back to top */
  }
`;

const StyledCard = styled(motion.div)(({ theme }) => ({
  margin: theme.spacing(2),
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    borderRadius: 'inherit',
    padding: 2,
    background: 'linear-gradient(270deg, transparent 0%, #4FC3F7 40%, #2196F3 60%, #1976D2 80%, transparent 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    filter: 'blur(3px)',
    transition: 'opacity 0.3s ease',
  },

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',

    '&::before': {
      opacity: 1,
      animation: `${moveComet} 3s linear infinite`,
    },
  },

  '& .MuiCard-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 0,
  },
}));

const CardBackground = styled('div')({
  backgroundImage: `url("${defaultBg}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '250px',
});

const ContentSection = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  padding: theme.spacing(2),
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
            <CardBackground />
            <ContentSection>
              <CardContent>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'text.primary',
                  }}
                >
                  {episode.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                  }}
                >
                  {episode.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 2
                }}>
                  <AudioControls
                    audioUrl={episode.audioUrl}
                    episodeId={episode.id}
                  />
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: 0.5
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                      }}
                    >
                      Duration: {episode.duration}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary',
                        ml: 2,
                      }}
                    >
                      {formatDate(episode.date)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </ContentSection>
          </Card>
        </StyledCard>
      )}
    </Draggable>
  );
};

export default EpisodeCard; 