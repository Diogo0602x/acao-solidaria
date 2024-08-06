const updateFundraising = {
  tags: ['Fundraising'],
  description: 'Update an existing fundraising campaign',
  operationId: 'updateFundraising',
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
          },
        },
        example: {
          name: 'Calendário Atualizado',
          quantity: 1200,
          quantityAvailable: 800,
          price: 12,
          imageUrl: 'http://example.com/imagem_atualizada.jpg',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Fundraising campaign updated successfully',
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
            name: 'Calendário Atualizado',
            quantity: 1200,
            quantityAvailable: 800,
            quantitySold: 400,
            price: 12,
            imageUrl: 'http://example.com/imagem_atualizada.jpg',
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

export { updateFundraising }
