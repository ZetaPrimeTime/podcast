import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Chip,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

const Blog = () => {
  const { posts } = useBlog();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4 
          }}>
            <Typography variant="h3" component="h1">
              Blog Posts
            </Typography>
            <Button
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={() => navigate('/blog/new')}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              New Post
            </Button>
          </Box>

          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} md={6} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.imageUrl}
                      alt={post.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          By {post.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(post.date)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Blog; 