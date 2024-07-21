const listPrincipalUser = {
  tags: ['Principal Users'],
  description: 'List all principal users (Churches and Seminaries)',
  operationId: 'listPrincipalUser',
  responses: {
    '200': {
      description: 'List of principal users retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
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
          },
          example: [
            {
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
          ],
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

export { listPrincipalUser }
