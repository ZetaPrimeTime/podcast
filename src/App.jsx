import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import About from './pages/About';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import { EpisodesProvider } from './context/EpisodesContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3436',
    },
    secondary: {
      main: '#6C5CE7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EpisodesProvider>
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <NavBar />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: 3,
                width: { sm: `calc(100% - ${240}px)` },
                ml: { sm: `${70}px` },
                transition: theme => theme.transitions.create(['margin', 'width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/episodes" element={<Episodes />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </EpisodesProvider>
    </ThemeProvider>
  );
}

export default App; 