const createPrincipalUser = {
  tags: ['Principal Users'],
  description: 'Create a new principal user (Church or Seminary)',
  operationId: 'createPrincipalUser',
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
            role: { type: 'string', enum: ['church', 'seminary'] },
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
          required: [
            'name',
            'email',
            'password',
            'confirmPassword',
            'role',
            'cnpj',
            'telephone',
            'address',
          ],
        },
        example: {
          name: 'Igreja de São Paulo',
          email: 'contact@igrejaspaulo.com.br',
          password: 'senha123',
          confirmPassword: 'senha123',
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
      },
    },
  },
  responses: {
    '201': {
      description: 'Principal user created successfully',
      content: {
        'application/json': {
          schema: {
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
          example: {
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

export { createPrincipalUser }
