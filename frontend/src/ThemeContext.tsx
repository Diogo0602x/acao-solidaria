import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  Theme,
} from '@mui/material/styles'

const getCSSVariableValue = (variable: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
}

const createCustomTheme = (): Theme => {
  return createTheme({
    palette: {
      primary: {
        main: getCSSVariableValue('--primary'),
        contrastText: getCSSVariableValue('--primary-foreground'),
      },
      secondary: {
        main: getCSSVariableValue('--secondary'),
        contrastText: getCSSVariableValue('--secondary-foreground'),
      },
      background: {
        default: getCSSVariableValue('--background'),
        paper: getCSSVariableValue('--foreground'),
      },
      text: {
        primary: getCSSVariableValue('--text-primary'),
        secondary: getCSSVariableValue('--text-secondary'),
      },
      error: {
        main: getCSSVariableValue('--error'),
      },
      success: {
        main: getCSSVariableValue('--success'),
      },
      warning: {
        main: getCSSVariableValue('--alert'),
      },
      info: {
        main: getCSSVariableValue('--info'),
      },
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },
  })
}

const ThemeContext = createContext<Theme | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined)

  useEffect(() => {
    const theme = createCustomTheme()
    setTheme(theme)
  }, [])

  if (!theme) return null

  return (
    <ThemeContext.Provider value={theme}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
