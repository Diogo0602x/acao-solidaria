const autenticateUser = {
  tags: ['Users'],
  description: 'Authenticate user (Priest, Seminarist, or Pilgrim)',
  operationId: 'authenticateUser',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            identifier: { type: 'string' }, // email or cpf
            password: { type: 'string' },
          },
          required: ['identifier', 'password'],
        },
        example: {
          identifier: 'user@example.com',
          password: 'senha123',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User authenticated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
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
              token: { type: 'string' },
            },
          },
          example: {
            user: {
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
            token: 'jwt_token',
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
    '401': {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'Invalid identifier or password',
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

export { autenticateUser }
