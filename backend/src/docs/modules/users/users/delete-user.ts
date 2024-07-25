const deleteUser = {
  tags: ['Users'],
  description: 'Delete a user by ID',
  operationId: 'deleteUser',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the user to delete',
      schema: {
        type: 'string',
      },
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
