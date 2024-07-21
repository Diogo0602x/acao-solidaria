const deleteUser = {
  tags: ['Users'],
  description: 'Delete a user (Priest, Seminarist, or Pilgrim) by ID',
  operationId: 'deleteUser',
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'User ID',
    },
  ],
  responses: {
    '204': {
      description: 'User deleted successfully',
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

export { deleteUser }
