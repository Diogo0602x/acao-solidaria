import * as Yup from 'yup'
import { UserRole } from '../../enums'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.mixed()
    .oneOf(Object.values(UserRole), 'Role is required')
    .required('Role is required'),
  cpf: Yup.string().when('role', {
    is: (role: UserRole) =>
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(role),
    then: (schema) =>
      schema.required('CPF is required').min(14, 'Invalid CPF format'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cnpj: Yup.string().when('role', {
    is: (role: UserRole) => [UserRole.CHURCH, UserRole.SEMINARY].includes(role),
    then: (schema) =>
      schema.required('CNPJ is required').min(18, 'Invalid CNPJ format'),
    otherwise: (schema) => schema.notRequired(),
  }),
  telephone: Yup.string().required('Telephone is required'),
  cellphone: Yup.string().optional(),
  address: Yup.object().shape({
    street: Yup.string().required('Street is required'),
    neighborhood: Yup.string().required('Neighborhood is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('ZIP Code is required')
      .min(9, 'Invalid ZIP Code format'),
    complement: Yup.string().optional(),
  }),
  linkedTo: Yup.string().when('role', {
    is: (role: UserRole) =>
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(role),
    then: (schema) => schema.required('Linked To is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

export { validationSchema }
