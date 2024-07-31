import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Box display="flex" position="relative">
      <Drawer
        variant="persistent"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Box width={250} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile"
                selected={location.pathname === '/profile'}
              >
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile/fundraisings-created"
                selected={location.pathname === '/profile/fundraisings-created'}
              >
                <ListItemText primary="Ações Criadas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile/fundraisings-bought"
                selected={location.pathname === '/profile/fundraisings-bought'}
              >
                <ListItemText primary="Ações Compradas" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {!isOpen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ marginLeft: '1rem', color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  )
}

export { ProfileMenu }
