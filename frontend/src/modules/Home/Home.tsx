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
      <Typography variant="h3" color="text.primary">
        Bem Vindo a Ação Solidária
      </Typography>
    </Box>
  )
}

export { Home }
