import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onBack?: () => void; // opcional
  showBackArrow?: boolean; // <- nueva prop
}

const Header: React.FC<HeaderProps> = ({ title, onBack, showBackArrow = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // retrocede en el historial
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
        {showBackArrow && (
          <IconButton onClick={handleBack} edge="start" sx={{ zIndex: 2 }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Box sx={{ position: 'absolute', width: '100%', textAlign: 'center', left: 0 }}>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
