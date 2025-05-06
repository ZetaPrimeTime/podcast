import React, { useState, useEffect } from 'react';
import { IconButton, Box, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Forward5Icon from '@mui/icons-material/Forward5';
import Replay5Icon from '@mui/icons-material/Replay5';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import useAudioPlayer from '../hooks/useAudioPlayer';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioControls = ({ audioUrl, episodeId }) => {
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const { 
    isPlaying, 
    currentTime,
    duration,
    togglePlay, 
    restart,
    seek,
    forward5,
    rewind5,
    setAudioVolume
  } = useAudioPlayer(audioUrl, episodeId);

  // Initialize volume state with saved volume from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('podcast-volume');
    if (savedVolume !== null) {
      const parsedVolume = parseFloat(savedVolume);
      setVolume(parsedVolume);
      setAudioVolume(parsedVolume);
      setPrevVolume(parsedVolume);
    } else {
      setAudioVolume(1); // Set default volume
    }
  }, [setAudioVolume]);

  const handleVolumeChange = (_, newValue) => {
    setVolume(newValue);
    setAudioVolume(newValue);
    localStorage.setItem('podcast-volume', newValue.toString());
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      setAudioVolume(0);
      localStorage.setItem('podcast-volume', '0');
    } else {
      setVolume(prevVolume);
      setAudioVolume(prevVolume);
      localStorage.setItem('podcast-volume', prevVolume.toString());
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeOffIcon />;
    if (volume < 0.5) return <VolumeDownIcon />;
    return <VolumeUpIcon />;
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Timeline */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {formatTime(currentTime)}
        </Typography>
        <Slider
          size="small"
          value={currentTime}
          max={duration || 100}
          onChange={(_, value) => seek(value)}
          sx={{
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
            },
          }}
        />
        <Typography variant="caption" color="text.secondary">
          {formatTime(duration || 0)}
        </Typography>
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <IconButton
          onClick={restart}
          color="primary"
          size="small"
          sx={{
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s',
            },
          }}
        >
          <RestartAltIcon />
        </IconButton>

        <IconButton
          onClick={rewind5}
          color="primary"
          size="small"
          sx={{
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s',
            },
          }}
        >
          <Replay5Icon />
        </IconButton>

        <IconButton
          onClick={togglePlay}
          color="primary"
          sx={{
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s',
            },
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <IconButton
          onClick={forward5}
          color="primary"
          size="small"
          sx={{
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s',
            },
          }}
        >
          <Forward5Icon />
        </IconButton>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          width: '120px',
          ml: 1
        }}>
          <IconButton
            onClick={toggleMute}
            color="primary"
            size="small"
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              },
            }}
          >
            {getVolumeIcon()}
          </IconButton>
          <Slider
            size="small"
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            sx={{
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
              },
              '& .MuiSlider-rail': {
                opacity: 0.3,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AudioControls; 