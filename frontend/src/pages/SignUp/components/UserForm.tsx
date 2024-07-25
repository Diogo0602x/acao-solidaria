import React, { useEffect, useState } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  FormHelperText,
} from '@mui/material'
import { useFormikContext, Field, getIn } from 'formik'
import { UserRole } from '@/enums'
import { getPrincipalUsers } from '@/pages/SignUp/service'
import { MaskedInput } from '@/components/MaskedInput'

const UserForm: React.FC = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<any>()
  const [principalUsers, setPrincipalUsers] = useState([])

  const selectedRole = values.role

  useEffect(() => {
    if (
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(
        selectedRole,
      )
    ) {
      getPrincipalUsers().then((data) => setPrincipalUsers(data))
    }
  }, [selectedRole])

  return (
    <Box>
      <FormControl
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'role') && getIn(touched, 'role'))}
      >
        <InputLabel id="role-label">Role</InputLabel>
        <Field
          name="role"
          as={Select}
          labelId="role-label"
          label="Role"
          fullWidth
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setFieldValue('role', e.target.value)
            setFieldValue('cpf', '')
            setFieldValue('cnpj', '')
          }}
        >
          <MenuItem value={UserRole.CHURCH}>Church</MenuItem>
          <MenuItem value={UserRole.SEMINARY}>Seminary</MenuItem>
          <MenuItem value={UserRole.PRIEST}>Priest</MenuItem>
          <MenuItem value={UserRole.SEMINARIST}>Seminarist</MenuItem>
          <MenuItem value={UserRole.PILGRIM}>Pilgrim</MenuItem>
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
          <InputLabel id="linkedTo-label">Linked To</InputLabel>
          <Field
            name="linkedTo"
            as={Select}
            labelId="linkedTo-label"
            label="Linked To"
            fullWidth
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
          }}
          error={Boolean(getIn(errors, 'cnpj') && getIn(touched, 'cnpj'))}
          helperText={getIn(touched, 'cnpj') && getIn(errors, 'cnpj')}
        />
      )}

      <Field
        name="name"
        as={TextField}
        label="Name"
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'name') && getIn(touched, 'name'))}
        helperText={getIn(touched, 'name') && getIn(errors, 'name')}
      />

      <Field
        name="email"
        as={TextField}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'email') && getIn(touched, 'email'))}
        helperText={getIn(touched, 'email') && getIn(errors, 'email')}
      />

      <Field
        name="password"
        as={TextField}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={Boolean(getIn(errors, 'password') && getIn(touched, 'password'))}
        helperText={getIn(touched, 'password') && getIn(errors, 'password')}
      />

      <Field
        name="confirmPassword"
        as={TextField}
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        error={Boolean(
          getIn(errors, 'confirmPassword') && getIn(touched, 'confirmPassword'),
        )}
        helperText={
          getIn(touched, 'confirmPassword') && getIn(errors, 'confirmPassword')
        }
      />

      <Field
        name="telephone"
        as={TextField}
        label="Telephone"
        fullWidth
        margin="normal"
        InputProps={{
          inputComponent: MaskedInput as any,
          inputProps: { mask: '(00) 00000-0000' },
        }}
        error={Boolean(
          getIn(errors, 'telephone') && getIn(touched, 'telephone'),
        )}
        helperText={getIn(touched, 'telephone') && getIn(errors, 'telephone')}
      />

      <Field
        name="cellphone"
        as={TextField}
        label="Cellphone"
        fullWidth
        margin="normal"
        InputProps={{
          inputComponent: MaskedInput as any,
          inputProps: { mask: '(00) 00000-0000' },
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
