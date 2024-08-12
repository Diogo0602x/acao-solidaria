const createImmediateCharge = {
  tags: ['Efi Create Immediate Charge'],
  description: 'Create an immediate charge using the PIX API',
  operationId: 'createImmediateCharge',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            cpf: { type: 'string' },
            nome: { type: 'string' },
            valor: { type: 'string' },
            chave: { type: 'string' },
          },
          required: ['cpf', 'nome', 'valor', 'chave'],
        },
        example: {
          cpf: '12345678909',
          nome: 'Francisco da Silva',
          valor: '0.01',
          chave: '06725151132',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Charge created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              txid: { type: 'string' },
              status: { type: 'string' },
            },
          },
          example: {
            txid: 'mock_txid',
            status: 'ACTIVE',
          },
        },
      },
    },
    '400': {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
          example: {
            error: 'Invalid request data',
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
              error: { type: 'string' },
            },
          },
          example: {
            error: 'Internal server error',
          },
        },
      },
    },
  },
}

export { createImmediateCharge }
