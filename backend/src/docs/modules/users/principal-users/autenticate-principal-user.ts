const autenticatePrincipalUser = {
  tags: ['Principal Users'],
  description: 'Authenticate principal user (Church or Seminary)',
  operationId: 'authenticatePrincipalUser',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            identifier: { type: 'string' }, // email or cnpj
            password: { type: 'string' },
          },
          required: ['identifier', 'password'],
        },
        example: {
          identifier: 'contact@igrejaspaulo.com.br',
          password: 'senha123',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Principal user authenticated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              principalUser: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string' },
                  cnpj: { type: 'string' },
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
                },
              },
              token: { type: 'string' },
            },
          },
          example: {
            principalUser: {
              id: 'principal_user_id',
              name: 'Igreja de São Paulo',
              email: 'contact@igrejaspaulo.com.br',
              role: 'church',
              cnpj: '12.345.678/0001-99',
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

export { autenticatePrincipalUser }
