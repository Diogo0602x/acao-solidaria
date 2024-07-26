import React, { useState, useEffect, useCallback } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuth } from '@/auth/AuthProvider'

const StyledAppBar = styled(AppBar)(() => ({
  transition: 'background-color 0.3s',
}))

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isLoggedIn, logout, checkAuth } = useAuth()
  const navigate = useNavigate()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Box>
        <Box display="flex" alignItems="center">
          {isLoggedIn ? (
            <>
              <IconButton edge="end" color="inherit" onClick={handleMenu}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate('/profile')}>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  marginRight: 2,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: isScrolled ? 'primary.light' : 'primary.light',
                    color: 'primary.light',
                  },
                }}
                onClick={() => navigate('/signup')}
              >
                Cadastrar-se
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                  color: isScrolled ? 'light' : 'primary.light',
                  '&:hover': {
                    borderColor: 'primary.light',
                    color: 'primary.light',
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export { Header }
