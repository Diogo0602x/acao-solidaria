const comboSelectPrincipalUsers = {
  tags: ['Principal Users'],
  description: 'Get combo select data for all principal users',
  operationId: 'comboSelectPrincipalUsers',
  responses: {
    '200': {
      description:
        'List of principal users for combo select retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                value: { type: 'string' },
              },
            },
          },
          example: [
            {
              label: 'Igreja de São Paulo',
              value: 'principal_user_id',
            },
          ],
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

export { comboSelectPrincipalUsers }
