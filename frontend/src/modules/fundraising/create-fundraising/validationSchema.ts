import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  quantity: Yup.number()
    .required('Quantidade é obrigatória')
    .positive('Quantidade deve ser positiva')
    .integer('Quantidade deve ser um número inteiro'),
  quantityAvailable: Yup.number()
    .required('Quantidade disponível é obrigatória')
    .positive('Quantidade disponível deve ser positiva')
    .integer('Quantidade disponível deve ser um número inteiro')
    .max(
      Yup.ref('quantity'),
      'Quantidade disponível não pode ser maior que a quantidade total',
    ),
  price: Yup.number()
    .required('Preço é obrigatório')
    .positive('Preço deve ser positivo'),
  imageUrl: Yup.string()
    .url('URL da imagem inválida')
    .required('URL da imagem é obrigatória'),
})

export { validationSchema }
