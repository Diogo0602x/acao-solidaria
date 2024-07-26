import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('CPF, CNPJ ou Email é obrigatório')
    .test('is-valid', 'Identificador inválido', function (value) {
      if (!value) return false
      const onlyNumbers = value.replace(/\D/g, '')
      const isCPF = onlyNumbers.length === 11 && /^\d{11}$/.test(onlyNumbers)
      const isCNPJ = onlyNumbers.length === 14 && /^\d{14}$/.test(onlyNumbers)
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      return isCPF || isCNPJ || isEmail
    }),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
})

export { validationSchema }
