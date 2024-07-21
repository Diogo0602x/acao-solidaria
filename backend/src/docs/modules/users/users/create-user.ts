const createUser = {
  tags: ['Users'],
  description: 'Create a new user (Priest, Seminarist, or Pilgrim)',
  operationId: 'createUser',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            confirmPassword: { type: 'string' },
            role: { type: 'string', enum: ['priest', 'seminarist', 'pilgrim'] },
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
            linkedTo: { type: 'string' }, // ID da Church ou Seminary ao qual está vinculado
          },
          required: [
            'name',
            'email',
            'password',
            'confirmPassword',
            'role',
            'cpf',
            'telephone',
            'address',
            'linkedTo',
          ],
        },
        example: {
          name: 'John Doe',
          email: 'user@example.com',
          password: 'senha123',
          confirmPassword: 'senha123',
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
  responses: {
    '201': {
      description: 'User created successfully',
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
            message: 'Invalid input data',
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

export { createUser }
