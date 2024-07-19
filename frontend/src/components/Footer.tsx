import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { FaInstagram, FaWhatsapp, FaChurch, FaPhone } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      py={4}
      bgcolor="background.default"
      color="text.primary"
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" align="center" sx={{ flexGrow: 1 }}>
            &copy; {new Date().getFullYear()} Jornada Solidária
          </Typography>
          <Box mx={1}>
            <a
              href="https://phone.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhone size={24} />
            </a>
          </Box>
          <Box mx={1}>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={24} />
            </a>
          </Box>
          <Box display="flex" alignItems="center">
            <Box mx={1}>
              <a
                href="https://www.instagram.com/rmater_brasilia/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </Box>
            <Box mx={1}>
              <a
                href="https://www.rmater.org.br/"
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
