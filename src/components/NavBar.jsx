import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateIcon from '@mui/icons-material/Create';

const drawerWidth = 240;
const collapsedWidth = 70;

const StyledDrawer = styled(Drawer)(({ theme, isCollapsed }) => ({
  width: isCollapsed ? collapsedWidth : drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: isCollapsed ? collapsedWidth : drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
}));

const NavItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? theme.palette.secondary.main : 'transparent',
  '&:hover': {
    backgroundColor: active 
      ? theme.palette.secondary.dark 
      : theme.palette.action.hover,
  },
  minHeight: 48,
}));

const NavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Episodes', icon: <HeadphonesIcon />, path: '/episodes' },
    { text: 'Upload Episode', icon: <CloudUploadIcon />, path: '/upload' },
    { text: 'Blog', icon: <CreateIcon />, path: '/blog' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const drawer = (
    <>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isCollapsed ? 'center' : 'space-between'
      }}>
        {!isCollapsed && (
          <Typography variant="h6" component="div">
            Podcast Name
          </Typography>
        )}
        {!isMobile && (
          <IconButton 
            onClick={toggleCollapse}
            sx={{ color: 'white' }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <Tooltip 
            title={isCollapsed ? item.text : ""} 
            placement="right" 
            key={item.text}
          >
            <NavItem
              button
              onClick={() => handleNavigation(item.path)}
              active={location.pathname === item.path ? 1 : 0}
              sx={{
                px: isCollapsed ? 2 : 3,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: isCollapsed ? 'auto' : 40 }}>
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </NavItem>
          </Tooltip>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'fixed', m: 2, zIndex: theme.zIndex.drawer + 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        isCollapsed={!isMobile && isCollapsed}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
};

export default NavBar; 