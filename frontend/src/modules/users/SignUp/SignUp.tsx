import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { createUser, getAddressByCep } from '@/modules/users/SignUp/service'
import { validationSchema } from '@/modules/users/SignUp/validationSchema'
import { UserForm } from '@/modules/users/SignUp/components/UserForm'
import { AddressForm } from '@/modules/users/SignUp/components/AddressForm'
import { initalValues } from './commons'
import { AlertMessage } from '@/components/AlertMessage'

const SignUp: React.FC = () => {
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info' | 'warning'
    text: string
  } | null>(null)
  const navigate = useNavigate()

  const handleCepChange = async (
    cep: string,
    setFieldValue: any,
    setFieldError: any,
  ) => {
    const { data, status } = await getAddressByCep(cep)
    if (status === 200) {
      setFieldValue('address.street', data.street)
      setFieldValue('address.neighborhood', data.neighborhood)
      setFieldValue('address.city', data.city)
      setFieldValue('address.state', data.state)
      setFieldError('address.zipCode', data.cep)
    } else {
      setFieldValue('address.street', '')
      setFieldValue('address.neighborhood', '')
      setFieldValue('address.city', '')
      setFieldValue('address.state', '')
      throw new Error('Invalid CEP')
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
        initialValues={initalValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await createUser(values)
            if (response.status === 201) {
              setMessage({
                type: 'success',
                text: 'Usuário criado com sucesso',
              })
              resetForm()
              setTimeout(() => {
                navigate('/login')
              }, 2000)
            } else {
              setMessage({ type: 'error', text: response.data.error })
            }
          } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ setFieldValue, setFieldError }) => (
          <Form>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 600,
                width: '100%',
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
                Cadastro
              </Typography>
              {message && (
                <AlertMessage type={message.type} message={message.text} />
              )}
              <UserForm />
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 'medium' }}
              >
                Endereço
              </Typography>
              <AddressForm
                handleCepChange={(cep: string) =>
                  handleCepChange(cep, setFieldValue, setFieldError)
                }
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}
              >
                <Button type="submit" variant="contained">
                  Cadastrar-se
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export { SignUp }
