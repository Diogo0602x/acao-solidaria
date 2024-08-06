const listFundraisingById = {
  tags: ['Fundraising'],
  description: 'Get a fundraising campaign by ID',
  operationId: 'listFundraisingById',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'The ID of the fundraising campaign to retrieve',
    },
  ],
  responses: {
    '200': {
      description: 'Fundraising campaign retrieved successfully',
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

export { listFundraisingById }
