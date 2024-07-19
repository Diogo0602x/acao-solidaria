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
        main: getCSSVariableValue('--secondary'), // '#100605'
        light: getCSSVariableValue('--primary'), // '#ffffff'
        dark: getCSSVariableValue('--overlay'), // '#000'
      },
      secondary: {
        main: getCSSVariableValue('--secondary'), // '#E5E7EB'
        contrastText: getCSSVariableValue('--secondary-foreground'), // '#D1D5DB'
      },
      background: {
        default: getCSSVariableValue('--background'), // '#100605'
        paper: getCSSVariableValue('--foreground'), // '#ffffff'
      },
      text: {
        primary: getCSSVariableValue('--text-primary'), // '#ffffff'
        secondary: getCSSVariableValue('--text-secondary'), // '#100605'
        disabled: getCSSVariableValue('--text-disabled'), // '#9CA3AF'
      },
      error: {
        main: getCSSVariableValue('--error'), // '#DC2626'
      },
      success: {
        main: getCSSVariableValue('--success'), // '#16A34A'
      },
      warning: {
        main: getCSSVariableValue('--alert'), // '#D97706'
      },
      info: {
        main: getCSSVariableValue('--info'), // '#0C83D9'
      },
      action: {
        disabled: getCSSVariableValue('--disabled'), // '#D1D5DB'
      },
      divider: getCSSVariableValue('--border'), // '#E5E7EB'
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: getCSSVariableValue('--primary'), // '#ffffff'
            color: getCSSVariableValue('--text-primary'), // '#ffffff'
            '&:hover': {
              backgroundColor: getCSSVariableValue('--primary-hover'), // '#100605'
            },
          },
        },
      },
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
