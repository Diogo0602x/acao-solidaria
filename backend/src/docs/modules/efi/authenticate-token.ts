const authenticateToken = {
  tags: ['Efi Authentication'],
  description:
    'Authenticate and retrieve an access token from the EFI platform',
  operationId: 'authenticateToken',
  responses: {
    '200': {
      description: 'Authentication successful',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              access_token: { type: 'string' },
            },
          },
          example: {
            access_token: 'your_access_token_here',
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
            error: 'Invalid credentials or request format',
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

export { authenticateToken }
