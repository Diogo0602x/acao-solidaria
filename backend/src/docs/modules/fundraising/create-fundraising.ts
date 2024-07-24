const createFundraising = {
  tags: ['Fundraising'],
  description: 'Create a new fundraising campaign',
  operationId: 'createFundraising',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            quantity: { type: 'number' },
            quantityAvailable: { type: 'number' },
            price: { type: 'number' },
            imageUrl: { type: 'string' },
            userId: { type: 'string' },
            pixKeyCpf: { type: 'string' },
            pixKeyCnpj: { type: 'string' },
          },
          required: [
            'name',
            'quantity',
            'quantityAvailable',
            'price',
            'imageUrl',
            'userId',
          ],
        },
        example: {
          name: 'Calendário',
          quantity: 1000,
          quantityAvailable: 1000,
          price: 10,
          imageUrl: 'http://example.com/imagem.jpg',
          userId: 'user_id',
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Fundraising campaign created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              quantity: { type: 'number' },
              quantityAvailable: { type: 'number' },
              quantitySold: { type: 'number' },
              price: { type: 'number' },
              imageUrl: { type: 'string' },
              user: { type: 'string' },
              pixKeyCpf: { type: 'string' },
              pixKeyCnpj: { type: 'string' },
            },
          },
          example: {
            id: 'fundraising_id',
            name: 'Calendário',
            quantity: 1000,
            quantityAvailable: 1000,
            quantitySold: 0,
            price: 10,
            imageUrl: 'http://example.com/imagem.jpg',
            user: 'user_id',
            pixKeyCpf: '123.456.789-00',
            pixKeyCnpj: '12.345.678/0001-99',
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

export { createFundraising }
