import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ProfileMenu } from '@/modules/users/Profile/components/ProfileMenu'

const ProfileLayout: React.FC = () => {
  return (
    <Box
      display="flex"
      height="100vh"
      style={{
        backgroundImage: "url('/bg-sign-up.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        paddingTop: '5rem',
      }}
    >
      <ProfileMenu />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export { ProfileLayout }
