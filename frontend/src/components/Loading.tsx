import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      sx={{ backgroundColor: 'background.default' }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Loading...
      </Typography>
    </Box>
  )
}

export { Loading }
