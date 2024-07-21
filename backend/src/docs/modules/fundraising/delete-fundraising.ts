const deleteFundraising = {
  tags: ['Fundraising'],
  description: 'Delete a fundraising campaign by ID',
  operationId: 'deleteFundraising',
  parameters: [
    {
      name: 'fundraisingId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'Fundraising ID',
    },
  ],
  responses: {
    '204': {
      description: 'Fundraising campaign deleted successfully',
    },
    '404': {
      description: 'Fundraising not found',
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
