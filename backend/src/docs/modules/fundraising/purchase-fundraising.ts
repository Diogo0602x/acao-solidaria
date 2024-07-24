const purchaseFundraising = {
  tags: ['Fundraising'],
  description: 'Purchase a quantity of a fundraising campaign',
  operationId: 'purchaseFundraising',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            fundraisingId: { type: 'string' },
            userId: { type: 'string' },
            quantity: { type: 'number' },
          },
          required: ['fundraisingId', 'userId', 'quantity'],
        },
        example: {
          fundraisingId: 'fundraising_id',
          userId: 'user_id',
          quantity: 10,
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Purchase made successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              fundraising: { type: 'string' },
              user: { type: 'string' },
              quantity: { type: 'number' },
              pricePurchased: { type: 'number' },
            },
          },
          example: {
            id: 'purchase_id',
            fundraising: 'fundraising_id',
            user: 'user_id',
            quantity: 10,
            pricePurchased: 100,
          },
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

export { purchaseFundraising }
