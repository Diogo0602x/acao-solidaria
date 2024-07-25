const authenticateUser = {
  tags: ['Users'],
  description: 'Authenticate user and generate JWT',
  operationId: 'authenticateUser',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            identifier: { type: 'string' }, // email, cpf, or cnpj
            password: { type: 'string' },
          },
          required: ['identifier', 'password'],
        },
        example: {
          identifier: 'user@example.com',
          password: 'password123',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Authentication successful',
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
            },
            token: 'jwt_token',
          },
        },
      },
    },
    '400': {
      description: 'Invalid credentials',
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

export { authenticateUser }
