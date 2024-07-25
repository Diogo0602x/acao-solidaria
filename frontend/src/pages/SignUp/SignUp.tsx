import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { createUser, getAddressByCep } from '@/pages/SignUp/service'
import { validationSchema } from '@/pages/SignUp/validationSchema'
import { UserForm } from '@/pages/SignUp/components/UserForm'
import { AddressForm } from '@/pages/SignUp/components/AddressForm'
import { initalValues } from './commons'

const SignUp: React.FC = () => {
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createUser(values)
            alert('User created successfully')
          } catch (error) {
            alert('Error creating user')
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
              <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
              </Typography>
              <UserForm />
              <Typography variant="h6" component="h2" gutterBottom>
                Address
              </Typography>
              <AddressForm
                handleCepChange={(cep: string) =>
                  handleCepChange(cep, setFieldValue, setFieldError)
                }
              />
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export { SignUp }
