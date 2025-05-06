import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            About Our Podcast
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our podcast platform! We're dedicated to bringing you the best content
            and most engaging stories from around the world.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to create an immersive listening experience that educates,
            entertains, and inspires our audience through carefully curated episodes
            and thought-provoking discussions.
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph>
            • High-quality audio production<br />
            • Diverse range of topics<br />
            • Expert guests and hosts<br />
            • Regular new content<br />
            • User-friendly platform
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
};

export default About; 