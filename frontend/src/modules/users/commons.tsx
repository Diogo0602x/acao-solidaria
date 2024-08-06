import { getAddressByCep } from '@/modules/users/SignUp/service'

export const handleCepChange = async (
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
