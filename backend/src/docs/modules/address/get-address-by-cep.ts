const getAddressByCep = {
  tags: ['Address'],
  description: 'Get address by CEP',
  operationId: 'getAddressByCep',
  parameters: [
    {
      name: 'cep',
      in: 'path',
      required: true,
      description: 'The CEP to get the address for',
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Successfully retrieved address',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              cep: { type: 'string' },
              street: { type: 'string' },
              neighborhood: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
            },
          },
          example: {
            cep: '01000-000',
            street: 'Rua Teste',
            neighborhood: 'Bairro Teste',
            city: 'Cidade Teste',
            state: 'ST',
          },
        },
      },
    },
    '400': {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'Invalid CEP',
          },
        },
      },
    },
    '500': {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'Internal server error',
          },
        },
      },
    },
  },
}

export { getAddressByCep }
