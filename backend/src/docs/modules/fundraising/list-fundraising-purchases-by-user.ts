const listFundraisingPurchasesByUser = {
  tags: ['Fundraising'],
  description: 'List all fundraising purchases by a user',
  operationId: 'listFundraisingPurchasesByUser',
  parameters: [
    {
      name: 'userId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'The ID of the user to retrieve purchases for',
    },
  ],
  responses: {
    '200': {
      description: 'List of fundraising purchases retrieved successfully',
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
                quantity: { type: 'number' },
                pricePurchased: { type: 'number' },
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
              quantity: 10,
              pricePurchased: 100,
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

export { listFundraisingPurchasesByUser }
