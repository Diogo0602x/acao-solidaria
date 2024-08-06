const deleteFundraising = {
  tags: ['Fundraising'],
  description: 'Delete a fundraising campaign',
  operationId: 'deleteFundraising',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'The ID of the fundraising campaign to delete',
    },
  ],
  responses: {
    '204': {
      description: 'Fundraising campaign deleted successfully',
    },
    '404': {
      description: 'Fundraising campaign not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          example: {
            message: 'Fundraising not found',
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

export { deleteFundraising }
