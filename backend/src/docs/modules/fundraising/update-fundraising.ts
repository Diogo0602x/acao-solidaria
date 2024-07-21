const updateFundraising = {
  tags: ['Fundraising'],
  description: 'Update a fundraising campaign',
  operationId: 'updateFundraising',
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
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            quantityAvailable: { type: 'number' },
            imageUrl: { type: 'string' },
          },
        },
        example: {
          name: 'Calendário Atualizado',
          quantityAvailable: 900,
          imageUrl: 'http://example.com/imagem.jpg',
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
              quantityAvailable: { type: 'number' },
              quantitySold: { type: 'number' },
              imageUrl: { type: 'string' },
              user: { type: 'string' },
              pixKeyCpf: { type: 'string' },
              pixKeyCnpj: { type: 'string' },
            },
          },
          example: {
            id: 'fundraising_id',
            name: 'Calendário Atualizado',
            quantityAvailable: 900,
            quantitySold: 100,
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

export { updateFundraising }
