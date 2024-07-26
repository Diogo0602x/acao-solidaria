import React, { useState } from 'react'
import { TextField, CircularProgress, Box } from '@mui/material'
import { useFormikContext, Field, getIn } from 'formik'
import { MaskedInput } from '@/components/MaskedInput'

interface AddressFormProps {
  handleCepChange: (cep: string) => Promise<void>
}

const AddressForm: React.FC<AddressFormProps> = ({ handleCepChange }) => {
  const { values, errors, touched } = useFormikContext<any>()
  const [loading, setLoading] = useState(false)
  const [cepErrorMessage, setCepErrorMessage] = useState(false)

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value
    if (cep.length !== 9) {
      setCepErrorMessage(true)
    } else {
      setLoading(true)
      setCepErrorMessage(false)
      try {
        await handleCepChange(cep)
      } catch (error) {
        setCepErrorMessage(true)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Box position="relative">
        <Field
          name="address.zipCode"
          as={TextField}
          label="CEP"
          fullWidth
          margin="normal"
          error={cepErrorMessage}
          helperText={cepErrorMessage ? 'Invalid CEP' : ''}
          InputProps={{
            inputComponent: MaskedInput as any,
            inputProps: { mask: '00000-000' },
            endAdornment: loading ? <CircularProgress size={24} /> : null,
          }}
          onBlur={handleCepBlur}
        />
      </Box>
      <Field
        name="address.street"
        as={TextField}
        label="Logradouro"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'address.street') && getIn(touched, 'address.street'),
        )}
        helperText={
          getIn(touched, 'address.street') && getIn(errors, 'address.street')
        }
        InputLabelProps={{ shrink: !!values.address.street }}
        disabled
      />
      <Field
        name="address.neighborhood"
        as={TextField}
        label="Bairro"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'address.neighborhood') &&
            getIn(touched, 'address.neighborhood'),
        )}
        helperText={
          getIn(touched, 'address.neighborhood') &&
          getIn(errors, 'address.neighborhood')
        }
        InputLabelProps={{ shrink: !!values.address.neighborhood }}
        disabled
      />
      <Field
        name="address.city"
        as={TextField}
        label="Cidade"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'address.city') && getIn(touched, 'address.city'),
        )}
        helperText={
          getIn(touched, 'address.city') && getIn(errors, 'address.city')
        }
        InputLabelProps={{ shrink: !!values.address.city }}
        disabled
      />
      <Field
        name="address.state"
        as={TextField}
        label="Estado"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'address.state') && getIn(touched, 'address.state'),
        )}
        helperText={
          getIn(touched, 'address.state') && getIn(errors, 'address.state')
        }
        InputLabelProps={{ shrink: !!values.address.state }}
        disabled
      />
      <Field
        name="address.complement"
        as={TextField}
        label="Complemento"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'address.complement') &&
            getIn(touched, 'address.complement'),
        )}
        helperText={
          getIn(touched, 'address.complement') &&
          getIn(errors, 'address.complement')
        }
        InputLabelProps={{ shrink: !!values.address.complement }}
      />
    </>
  )
}

export { AddressForm }
