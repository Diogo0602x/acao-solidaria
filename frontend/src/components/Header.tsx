import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { styled } from '@mui/system'

const StyledAppBar = styled(AppBar)(() => ({
  transition: 'background-color 0.3s',
}))

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const logo = isScrolled ? '/logo-preto.svg' : '/logo-branco.svg'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <StyledAppBar
      position="fixed"
      color="transparent"
      sx={{
        backgroundColor: isScrolled ? 'white' : 'transparent',
        color: isScrolled ? 'black' : 'white',
      }}
      elevation={isScrolled ? 4 : 0}
    >
      <Toolbar className="container mx-auto">
        <Box display="flex" flexGrow={1}>
          <img src={logo} alt="Jornada Solidária" className="h-14" />
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            sx={{
              marginRight: 2,
              borderColor: isScrolled ? 'black' : 'white',
              color: isScrolled ? 'black' : 'white',
              '&:hover': { borderColor: isScrolled ? 'black' : 'white' },
            }}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isScrolled ? 'black' : 'white',
              color: isScrolled ? 'white' : 'black',
              '&:hover': {
                backgroundColor: isScrolled
                  ? 'rgba(0, 0, 0, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
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
