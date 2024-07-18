import React from 'react'
import { Box, Typography } from '@mui/material'

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '5rem',
      }}
    >
      <Typography variant="h2" color="textPrimary">
        Bem Vindo a Jornada Solidária
      </Typography>
    </Box>
  )
}

export { Home }
