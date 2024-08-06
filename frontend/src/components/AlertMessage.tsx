// components/AlertMessage.tsx

import React from 'react'
import { Box, Typography } from '@mui/material'
import {
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Warning,
} from '@mui/icons-material'

interface AlertMessageProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          color: '#155724',
          icon: <CheckCircle />,
        }
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          icon: <ErrorIcon />,
        }
      case 'info':
        return { backgroundColor: '#d1ecf1', color: '#0c5460', icon: <Info /> }
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          color: '#856404',
          icon: <Warning />,
        }
      default:
        return { backgroundColor: '#ffffff', color: '#000000', icon: <Info /> }
    }
  }

  const styles = getStyles()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: '16px',
        borderRadius: '4px',
        marginBottom: '16px',
      }}
    >
      <Box sx={{ marginRight: '8px' }}>{styles.icon}</Box>
      <Typography>{message}</Typography>
    </Box>
  )
}

export { AlertMessage }
