import React, { useEffect, useState, useCallback } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormikContext, Field, getIn } from 'formik'
import { UserRole } from '@/enums'
import { getPrincipalUsers as fetchPrincipalUsers } from '@/modules/users/SignUp/service'
import { MaskedInput } from '@/components/MaskedInput'

interface UserFormProps {
  isDetail?: boolean
  isEdit?: boolean
}

const UserForm: React.FC<UserFormProps> = ({
  isDetail = false,
  isEdit = false,
}) => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>()
  const [principalUsers, setPrincipalUsers] = useState<
    { label: string; value: string }[]
  >([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const selectedRole = values.role

  const getPrincipalUsers = useCallback(async () => {
    try {
      const response = await fetchPrincipalUsers()
      if (response.status === 200) {
        setPrincipalUsers(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch principal users:', error)
    }
  }, [])

  useEffect(() => {
    if (
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(
        selectedRole,
      )
    ) {
      getPrincipalUsers()
    }
  }, [selectedRole, getPrincipalUsers])

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)

  return (
    <Box>
      <FormControl
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'role') && getIn(touched, 'role'))}
      >
        <InputLabel id="role-label">Você é</InputLabel>
        <Field
          name="role"
          as={Select}
          labelId="role-label"
          label="Você é"
          fullWidth
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setFieldValue('role', e.target.value)
            setFieldValue('cpf', '')
            setFieldValue('cnpj', '')
          }}
          disabled={isDetail}
        >
          <MenuItem value={UserRole.CHURCH}>Igreja</MenuItem>
          <MenuItem value={UserRole.SEMINARY}>Seminário</MenuItem>
          <MenuItem value={UserRole.PRIEST}>Padre</MenuItem>
          <MenuItem value={UserRole.SEMINARIST}>Seminarista</MenuItem>
          <MenuItem value={UserRole.PILGRIM}>Peregrino</MenuItem>
        </Field>
        <FormHelperText>
          {getIn(touched, 'role') && getIn(errors, 'role')}
        </FormHelperText>
      </FormControl>

      {[UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(
        selectedRole,
      ) && (
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(
            getIn(errors, 'linkedTo') && getIn(touched, 'linkedTo'),
          )}
        >
          <InputLabel id="linkedTo-label">
            Qual sua igreja ou seminário?
          </InputLabel>
          <Field
            name="linkedTo"
            as={Select}
            labelId="linkedTo-label"
            label="Qual sua igreja ou seminário?"
            fullWidth
            disabled={isDetail}
          >
            {principalUsers.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                {user.label}
              </MenuItem>
            ))}
          </Field>
          <FormHelperText>
            {getIn(touched, 'linkedTo') && getIn(errors, 'linkedTo')}
          </FormHelperText>
        </FormControl>
      )}

      <Field
        name="name"
        as={TextField}
        label="Nome"
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'name') && getIn(touched, 'name'))}
        helperText={getIn(touched, 'name') && getIn(errors, 'name')}
        disabled={isDetail}
      />

      {[UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(
        selectedRole,
      ) && (
        <Field
          name="cpf"
          as={TextField}
          label="CPF"
          fullWidth
          margin="normal"
          InputProps={{
            inputComponent: MaskedInput as any,
            inputProps: { mask: '000.000.000-00' },
            disabled: isDetail,
          }}
          error={Boolean(getIn(errors, 'cpf') && getIn(touched, 'cpf'))}
          helperText={getIn(touched, 'cpf') && getIn(errors, 'cpf')}
        />
      )}

      {[UserRole.CHURCH, UserRole.SEMINARY].includes(selectedRole) && (
        <Field
          name="cnpj"
          as={TextField}
          label="CNPJ"
          fullWidth
          margin="normal"
          InputProps={{
            inputComponent: MaskedInput as any,
            inputProps: { mask: '00.000.000/0000-00' },
            disabled: isDetail,
          }}
          error={Boolean(getIn(errors, 'cnpj') && getIn(touched, 'cnpj'))}
          helperText={getIn(touched, 'cnpj') && getIn(errors, 'cnpj')}
        />
      )}

      <Field
        name="email"
        as={TextField}
        label="E-mail"
        type="email"
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'email') && getIn(touched, 'email'))}
        helperText={getIn(touched, 'email') && getIn(errors, 'email')}
        disabled={isDetail}
      />

      {!isDetail && !isEdit && (
        <>
          <Field
            name="password"
            as={TextField}
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            error={Boolean(
              getIn(errors, 'password') && getIn(touched, 'password'),
            )}
            helperText={getIn(touched, 'password') && getIn(errors, 'password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Field
            name="confirmPassword"
            as={TextField}
            label="Confirma sua senha"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            error={Boolean(
              getIn(errors, 'confirmPassword') &&
                getIn(touched, 'confirmPassword'),
            )}
            helperText={
              getIn(touched, 'confirmPassword') &&
              getIn(errors, 'confirmPassword')
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}

      <Field
        name="telephone"
        as={TextField}
        label="Telefone"
        fullWidth
        margin="normal"
        InputProps={{
          inputComponent: MaskedInput as any,
          inputProps: { mask: '(00) 00000-0000' },
          disabled: isDetail,
        }}
        error={Boolean(
          getIn(errors, 'telephone') && getIn(touched, 'telephone'),
        )}
        helperText={getIn(touched, 'telephone') && getIn(errors, 'telephone')}
      />

      <Field
        name="cellphone"
        as={TextField}
        label="Celular"
        fullWidth
        margin="normal"
        InputProps={{
          inputComponent: MaskedInput as any,
          inputProps: { mask: '(00) 0000-0000' },
          disabled: isDetail,
        }}
        error={Boolean(
          getIn(errors, 'cellphone') && getIn(touched, 'cellphone'),
        )}
        helperText={getIn(touched, 'cellphone') && getIn(errors, 'cellphone')}
      />
    </Box>
  )
}

export { UserForm }
