import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { UserForm } from '@/modules/users/SignUp/components/UserForm'
import { AddressForm } from '@/modules/users/SignUp/components/AddressForm'
import { updateUserProfile } from '@/modules/users/Profile/service'
import { validationSchemaEdit } from '@/modules/users/Profile/validationSchemaEdit'
import { AlertMessage } from '@/components/AlertMessage'
import { handleCepChange } from '@/modules/users/commons'
import { useAuth } from '@/auth/AuthProvider'
import { Loading } from '@/components/Loading'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info' | 'warning'
    text: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = async (values: any) => {
    setIsLoading(true)
    const { status } = await updateUserProfile(user._id, values)
    setIsLoading(false)
    if (status === 200) {
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso' })
      setEditMode(false)
    } else {
      setMessage({ type: 'error', text: 'Falha ao atualizar perfil' })
    }
  }

  if (!user && isLoading) return <Loading />

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchemaEdit}
      onSubmit={(values) => {
        const { ...restValues } = values
        handleUpdateProfile(restValues)
      }}
      context={{ isEdit: editMode }}
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
              {editMode ? 'Editar Perfil' : 'Perfil'}
            </Typography>
            {message && (
              <AlertMessage type={message.type} message={message.text} />
            )}
            <UserForm isDetail={!editMode} isEdit={editMode} />
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
              isDetail={!editMode}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancelar' : 'Editar'}
              </Button>
              {editMode && (
                <Button type="submit" variant="contained" color="secondary">
                  Salvar
                </Button>
              )}
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export { Profile }
