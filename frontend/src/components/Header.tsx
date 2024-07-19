import React, { useState, useEffect, useCallback } from 'react'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { styled } from '@mui/system'

const StyledAppBar = styled(AppBar)(() => ({
  transition: 'background-color 0.3s',
}))

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <StyledAppBar
      position="fixed"
      color="transparent"
      sx={{
        backgroundColor: isScrolled ? 'background.default' : 'transparent',
        color: isScrolled ? 'primary.main' : 'primary.light',
      }}
      elevation={isScrolled ? 4 : 0}
    >
      <Toolbar className="container mx-auto">
        <Box display="flex" flexGrow={1}>
          <img
            src="/logo-branco.svg"
            alt="Jornada Solidária"
            className="h-16"
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            sx={{
              marginRight: 2,
              backgroundColor: 'primary.main',
              color: 'primary.light',
              '&:hover': {
                borderColor: isScrolled ? 'primary.light' : 'primary.light',
                color: 'primary.light',
              },
            }}
          >
            Cadastrar-se
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: isScrolled ? 'primary.light' : 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.light',
                color: 'primary.light',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export { Header }
