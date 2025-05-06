import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BitcoinClock from '../components/BitcoinClock';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <BitcoinClock />
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeadphonesIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Our Podcast
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Discover amazing stories and insights from our latest episodes
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/episodes')}
            sx={{
              borderRadius: 8,
              px: 4,
              py: 2,
              fontSize: '1.2rem',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s',
              },
            }}
          >
            Start Listening
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 4,
              backgroundColor: 'background.paper',
              borderRadius: 4,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Featured Episodes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check out our latest and most popular episodes. Drag and reorder them to create your perfect playlist.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Home; 