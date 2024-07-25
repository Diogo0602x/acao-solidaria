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
      allVariants: {
        color: getCSSVariableValue('--text-secondary'),
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: getCSSVariableValue('--secondary'), // '#100605'
            color: getCSSVariableValue('--primary'), // '#FFFFFF'
            '&:hover': {
              backgroundColor: getCSSVariableValue('--secondary'), // '#301614'
              color: getCSSVariableValue('--primary'), // '#FFFFFF'
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            backgroundColor: getCSSVariableValue('--primary'), // White background
            color: getCSSVariableValue('--text-secondary'), // Dark text
            '&:hover': {
              borderColor: getCSSVariableValue('--secondary'), // Dark hover border
            },
          },
          icon: {
            color: getCSSVariableValue('--text-secondary'), // Dark icon
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: getCSSVariableValue('--primary'), // White background
            color: getCSSVariableValue('--text-secondary'), // Dark text
            '&.Mui-selected': {
              backgroundColor: getCSSVariableValue('--secondary-foreground'), // Highlight selected item
              color: getCSSVariableValue('--text-primary'), // Highlight text color
            },
            '&:hover': {
              backgroundColor: getCSSVariableValue('--secondary-foreground'), // Hover background
              color: getCSSVariableValue('--text-primary'), // Hover text color
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            backgroundColor: getCSSVariableValue('--primary'), // White background for input
            color: getCSSVariableValue('--text-secondary'), // Dark text for input
            '&:hover': {
              borderColor: getCSSVariableValue('--secondary'), // Dark hover border
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: getCSSVariableValue('--secondary'), // Dark focused border
            },
          },
          notchedOutline: {
            borderColor: getCSSVariableValue('--secondary'), // Default border
            '&:hover': {
              borderColor: getCSSVariableValue('--secondary'), // Dark hover border
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: getCSSVariableValue('--text-secondary'), // Dark text for label
            '&.Mui-focused': {
              color: getCSSVariableValue('--text-secondary'), // Dark text for focused label
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
