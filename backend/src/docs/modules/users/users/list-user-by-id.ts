const listUserById = {
  tags: ['Users'],
  description: 'Get user by ID',
  operationId: 'listUserById',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the user to retrieve',
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': {
      description: 'User details',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              cpf: { type: 'string' },
              telephone: { type: 'string' },
              cellphone: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  street: { type: 'string' },
                  neighborhood: { type: 'string' },
                  city: { type: 'string' },
                  state: { type: 'string' },
                  zipCode: { type: 'string' },
                  complement: { type: 'string' },
                },
              },
              linkedTo: { type: 'string' },
            },
          },
          example: {
            id: 'user_id',
            name: 'John Doe',
            email: 'user@example.com',
            role: 'priest',
            cpf: '123.456.789-00',
            telephone: '(11) 1234-5678',
            cellphone: '(11) 91234-5678',
            address: {
              street: 'Rua da Consolação',
              neighborhood: 'Centro',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01000-000',
              complement: 'Próximo ao metrô',
            },
            linkedTo: 'principal_user_id',
          },
        },
      },
    },
    '404': {
      description: 'User not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'User not found',
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

export { listUserById }
