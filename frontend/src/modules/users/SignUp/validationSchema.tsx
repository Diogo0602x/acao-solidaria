import * as Yup from 'yup'
import { UserRole } from '@/enums'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  role: Yup.mixed()
    .oneOf(
      Object.values(UserRole),
      'Escolha um papel válido: Igreja, Seminário, Padre, Seminarista ou Peregrino',
    )
    .required('Papel é obrigatório'),
  cpf: Yup.string().when('role', {
    is: (role: UserRole) =>
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(role),
    then: (schema) =>
      schema.required('CPF é obrigatório').min(14, 'Formato de CPF inválido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cnpj: Yup.string().when('role', {
    is: (role: UserRole) => [UserRole.CHURCH, UserRole.SEMINARY].includes(role),
    then: (schema) =>
      schema.required('CNPJ é obrigatório').min(18, 'Formato de CNPJ inválido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  telephone: Yup.string().required('Telefone é obrigatório'),
  cellphone: Yup.string().optional(),
  address: Yup.object().shape({
    street: Yup.string().required('Rua é obrigatória'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    zipCode: Yup.string()
      .required('CEP é obrigatório')
      .min(9, 'Formato de CEP inválido'),
    complement: Yup.string().optional(),
  }),
  linkedTo: Yup.string().when('role', {
    is: (role: UserRole) =>
      [UserRole.PRIEST, UserRole.SEMINARIST, UserRole.PILGRIM].includes(role),
    then: (schema) => schema.required('Vinculado a é obrigatório'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

export { validationSchema }
