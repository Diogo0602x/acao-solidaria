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
import { loginUser } from '@/pages/Login/service'
import { validationSchema } from '@/pages/Login/validationSchema'
import { IdentifierInput } from '@/pages/Login/components/IdentifierInput'

const Login: React.FC = () => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info' | 'warning'
    text: string
  } | null>(null)
  const navigate = useNavigate()

  const initialValues = {
    identifier: '',
    password: '',
  }

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await loginUser(values)
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Login realizado com sucesso' })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setMessage({ type: 'error', text: response.data.error })
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{
        backgroundImage: "url('/bg-sign-up.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        paddingTop: '5rem',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, isValid }) => (
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
                Login
              </Typography>
              {message && (
                <AlertMessage type={message.type} message={message.text} />
              )}
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(
                  getIn(errors, 'identifier') && getIn(touched, 'identifier'),
                )}
              >
                <Field
                  name="identifier"
                  as={IdentifierInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('identifier', e.target.value)
                  }}
                />
                <FormHelperText>
                  {getIn(touched, 'identifier') && getIn(errors, 'identifier')}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                error={Boolean(
                  getIn(errors, 'password') && getIn(touched, 'password'),
                )}
              >
                <Field
                  name="password"
                  as={TextField}
                  label="Senha"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <FormHelperText>
                  {getIn(touched, 'password') && getIn(errors, 'password')}
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
                  Entrar
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export { Login }
