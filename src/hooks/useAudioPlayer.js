import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = (audioUrl, episodeId) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio(audioUrl));
  
  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`podcast-progress-${episodeId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentTime(progress.time);
      audioRef.current.currentTime = progress.time;
    }

    // Set up duration when metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [episodeId]);

  // Save progress to localStorage and update currentTime
  useEffect(() => {
    const handleTimeUpdate = () => {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      localStorage.setItem(
        `podcast-progress-${episodeId}`,
        JSON.stringify({ time })
      );
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [episodeId]);

  // Handle playing state
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const audio = audioRef.current;
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Pause other audio when playing new episode
  useEffect(() => {
    const currentAudio = audioRef.current;
    
    const handlePlay = () => {
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== currentAudio && !audio.paused) {
          audio.pause();
        }
      });
    };

    currentAudio.addEventListener('play', handlePlay);
    return () => currentAudio.removeEventListener('play', handlePlay);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const restart = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const forward5 = () => {
    const newTime = Math.min(audioRef.current.currentTime + 5, duration);
    seek(newTime);
  };

  const rewind5 = () => {
    const newTime = Math.max(audioRef.current.currentTime - 5, 0);
    seek(newTime);
  };

  return {
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    restart,
    seek,
    forward5,
    rewind5,
  };
};

export default useAudioPlayer; 