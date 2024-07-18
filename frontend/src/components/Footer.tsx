import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { FaInstagram, FaWhatsapp, FaChurch } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <Box component="footer" py={4} bgcolor="white" color="primary.contrastText">
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" align="center" sx={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} Jornada Solidária
          </Typography>
          <Box display="flex" alignItems="center">
            <Box mx={1}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </Box>
            <Box mx={1}>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} />
              </a>
            </Box>
            <Box mx={1}>
              <a
                href="https://yourchurchwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaChurch size={24} />
              </a>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export { Footer }
