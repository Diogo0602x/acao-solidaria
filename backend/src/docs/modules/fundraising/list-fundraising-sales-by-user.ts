const listFundraisingSalesByUser = {
  tags: ['Fundraising'],
  description: 'List all fundraising sales by a user',
  operationId: 'listFundraisingSalesByUser',
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'The ID of the user to retrieve sales for',
    },
  ],
  responses: {
    '200': {
      description: 'List of fundraising sales retrieved successfully',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fundraising: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    imageUrl: { type: 'string' },
                    user: { type: 'string' },
                  },
                },
                quantitySold: { type: 'number' },
                priceSold: { type: 'number' },
              },
            },
          },
          example: [
            {
              fundraising: {
                id: 'fundraising_id',
                name: 'Calendário',
                imageUrl: 'http://example.com/imagem.jpg',
                user: 'user_id',
              },
              quantitySold: 10,
              priceSold: 100,
            },
          ],
        },
      },
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

export { listFundraisingSalesByUser }
