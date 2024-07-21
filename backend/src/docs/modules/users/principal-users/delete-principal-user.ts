const deletePrincipalUser = {
  tags: ['Principal Users'],
  description: 'Delete a principal user (Church or Seminary) by ID',
  operationId: 'deletePrincipalUser',
  parameters: [
    {
      name: 'principalUserId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'Principal user ID',
    },
  ],
  responses: {
    '204': {
      description: 'Principal user deleted successfully',
    },
    '404': {
      description: 'Principal user not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'Principal user not found',
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

export { deletePrincipalUser }
