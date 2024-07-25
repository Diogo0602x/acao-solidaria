const comboSelectPrincipalUsers = {
  tags: ['Users'],
  description:
    'Get a combo select list of all principal users (church or seminary)',
  operationId: 'comboSelectPrincipalUsers',
  responses: {
    '200': {
      description: 'List of principal users',
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
            { label: 'Church 1', value: 'principal_user_id_1' },
            { label: 'Seminary 2', value: 'principal_user_id_2' },
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

export { comboSelectPrincipalUsers }
