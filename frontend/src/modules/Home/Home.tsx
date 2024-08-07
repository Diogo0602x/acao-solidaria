import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChurchIcon from '@mui/icons-material/Church'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/fundraisings')
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="top"
      height="100vh"
      style={{
        backgroundImage: "url('/bg-home.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '5rem',
      }}
    >
      <Typography variant="h3" color="text.primary" gutterBottom>
        Bem Vindo a Ação Solidária
      </Typography>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Doe com Amor
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleButtonClick}
        startIcon={<ChurchIcon />}
        endIcon={<FavoriteIcon />}
        sx={{
          color: 'white',
          borderColor: 'white',
          backgroundColor: 'transparent',
        }}
      >
        Conheça nossas ações solidárias
      </Button>
    </Box>
  )
}

export { Home }
