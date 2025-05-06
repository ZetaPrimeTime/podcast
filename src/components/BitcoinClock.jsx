import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { motion } from 'framer-motion';

const ClockContainer = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const BitcoinClock = () => {
  const [price, setPrice] = useState(null);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeInterval;
    let priceInterval;

    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.bitcoin.usd);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        setLoading(false);
      }
    };

    // Immediate initial fetch
    fetchBitcoinPrice();

    // Set up intervals after initial fetch
    timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    priceInterval = setInterval(fetchBitcoinPrice, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(priceInterval);
    };
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <ClockContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      component={Paper}
      elevation={3}
    >
      <CurrencyBitcoinIcon color="primary" />
      <Box>
        {loading ? (
          <>
            <Skeleton variant="text" width={120} height={32} />
            <Skeleton variant="text" width={80} height={20} />
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {price ? formatPrice(price) : 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(time)}
            </Typography>
          </>
        )}
      </Box>
    </ClockContainer>
  );
};

export default BitcoinClock; 