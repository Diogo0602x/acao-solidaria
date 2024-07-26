import React, { useState, useEffect } from 'react'
import { Box, TextField, MenuItem } from '@mui/material'
import { MaskedInput } from '@/components/MaskedInput'

interface IdentifierInputProps {
  name: string
  onChange: (event: { target: { name: string; value: string } }) => void
  value: string
}

const IdentifierInput: React.FC<IdentifierInputProps> = ({
  name,
  onChange,
  value,
}) => {
  const [type, setType] = useState<'cpf' | 'cnpj' | 'email'>('email')
  const [label, setLabel] = useState('Digite seu E-mail')

  useEffect(() => {
    switch (type) {
      case 'cpf':
        setLabel('Digite seu CPF')
        break
      case 'cnpj':
        setLabel('Digite seu CNPJ')
        break
      case 'email':
      default:
        setLabel('Digite seu E-mail')
        break
    }
  }, [type])

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.value as 'cpf' | 'cnpj' | 'email'
    setType(newType)
    onChange({ target: { name, value: '' } })
  }

  const getMask = () => {
    switch (type) {
      case 'cpf':
        return '000.000.000-00'
      case 'cnpj':
        return '00.000.000/0000-00'
      case 'email':
      default:
        return ''
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        select
        label="Tipo de login"
        value={type}
        onChange={handleTypeChange}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="cpf">CPF</MenuItem>
        <MenuItem value="cnpj">CNPJ</MenuItem>
        <MenuItem value="email">Email</MenuItem>
      </TextField>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          inputComponent: type !== 'email' ? (MaskedInput as any) : undefined,
          inputProps: { mask: getMask() },
        }}
        fullWidth
        variant="outlined"
      />
    </Box>
  )
}

export { IdentifierInput }
