import React, { useState, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useEpisodes } from '../context/EpisodesContext';

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getAudioDuration = (file) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener('loadedmetadata', () => {
      resolve(formatDuration(audio.duration));
    });
    audio.src = URL.createObjectURL(file);
  });
};

const Upload = () => {
  const navigate = useNavigate();
  const { addEpisode } = useEpisodes();
  const [dragActive, setDragActive] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  }, []);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return;

    setUploading(true);
    try {
      // Get audio duration
      const duration = await getAudioDuration(audioFile);
      
      // Create a blob URL for the audio file
      const audioUrl = URL.createObjectURL(audioFile);
      
      // Add the new episode with duration
      addEpisode({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        audioUrl: audioUrl,
        duration: duration, // Add the actual duration
      });

      setShowSuccess(true);
      
      // Reset form
      setAudioFile(null);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });

      // Navigate to episodes page after a short delay
      setTimeout(() => {
        navigate('/episodes');
      }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Upload New Episode
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    border: '2px dashed',
                    borderColor: dragActive ? 'primary.main' : 'grey.300',
                    bgcolor: dragActive ? 'action.hover' : 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {audioFile ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                      <Typography>{audioFile.name}</Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => setAudioFile(null)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileInput}
                        style={{ display: 'none' }}
                        id="audio-file-input"
                      />
                      <label htmlFor="audio-file-input">
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Drag and drop your audio file here
                        </Typography>
                        <Typography color="textSecondary">
                          or click to browse
                        </Typography>
                      </label>
                    </>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Episode Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Release Date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!audioFile || uploading}
                  startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload Episode'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Episode uploaded successfully! Redirecting to episodes page...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Upload; 