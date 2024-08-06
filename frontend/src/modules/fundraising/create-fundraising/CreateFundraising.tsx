import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
} from '@mui/material'
import { Formik, Form, Field, getIn } from 'formik'
import { useNavigate } from 'react-router-dom'
import { AlertMessage } from '@/components/AlertMessage'
import { createFundraising } from '@/modules/fundraising/service'
import { validationSchema } from '@/modules/fundraising/create-fundraising/validationSchema'
import { useAuth } from '@/auth/AuthProvider'

const CreateFundraising: React.FC = () => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info' | 'warning'
    text: string
  } | null>(null)
  const navigate = useNavigate()
  const { user } = useAuth()

  const initialValues = {
    name: '',
    quantity: 0,
    quantityAvailable: 0,
    price: 0,
    imageUrl: '',
    userId: user._id,
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await createFundraising(values)
      if (response.status === 201) {
        setMessage({ type: 'success', text: 'Ação criada com sucesso' })
        setTimeout(() => {
          navigate('/profile/fundraisings-created')
        }, 2000)
      } else {
        setMessage({ type: 'error', text: response.data.error })
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar ação'
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 600,
              width: 'auto',
              overflowY: 'auto',
              maxHeight: '90vh',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ textAlign: 'center', fontWeight: 'medium' }}
            >
              Criar Ação
            </Typography>
            {message && (
              <AlertMessage type={message.type} message={message.text} />
            )}
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(getIn(errors, 'name') && getIn(touched, 'name'))}
            >
              <Field
                name="name"
                as={TextField}
                label="Nome"
                fullWidth
                margin="normal"
              />
              <FormHelperText>
                {getIn(touched, 'name') && getIn(errors, 'name')}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(
                getIn(errors, 'quantity') && getIn(touched, 'quantity'),
              )}
            >
              <Field
                name="quantity"
                as={TextField}
                label="Quantidade"
                type="number"
                fullWidth
                margin="normal"
              />
              <FormHelperText>
                {getIn(touched, 'quantity') && getIn(errors, 'quantity')}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(
                getIn(errors, 'quantityAvailable') &&
                  getIn(touched, 'quantityAvailable'),
              )}
            >
              <Field
                name="quantityAvailable"
                as={TextField}
                label="Quantidade Disponível"
                type="number"
                fullWidth
                margin="normal"
              />
              <FormHelperText>
                {getIn(touched, 'quantityAvailable') &&
                  getIn(errors, 'quantityAvailable')}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(getIn(errors, 'price') && getIn(touched, 'price'))}
            >
              <Field
                name="price"
                as={TextField}
                label="Preço (R$)"
                type="number"
                fullWidth
                margin="normal"
              />
              <FormHelperText>
                {getIn(touched, 'price') && getIn(errors, 'price')}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              error={Boolean(
                getIn(errors, 'imageUrl') && getIn(touched, 'imageUrl'),
              )}
            >
              <Field
                name="imageUrl"
                as={TextField}
                label="URL da Imagem"
                fullWidth
                margin="normal"
              />
              <FormHelperText>
                {getIn(touched, 'imageUrl') && getIn(errors, 'imageUrl')}
              </FormHelperText>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 2,
              }}
            >
              <Button type="submit" variant="contained" disabled={!isValid}>
                Salvar
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export { CreateFundraising }
