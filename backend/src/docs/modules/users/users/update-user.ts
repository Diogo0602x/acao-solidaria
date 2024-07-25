const updateUser = {
  tags: ['Users'],
  description: 'Update a user by ID',
  operationId: 'updateUser',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: 'ID of the user to update',
      schema: {
        type: 'string',
      },
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            confirmPassword: { type: 'string' },
            role: {
              type: 'string',
              enum: ['priest', 'seminarist', 'pilgrim', 'church', 'seminary'],
            },
            cpf: { type: 'string' },
            cnpj: { type: 'string' },
            telephone: { type: 'string' },
            cellphone: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                neighborhood: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                zipCode: { type: 'string' },
                complement: { type: 'string' },
              },
            },
            linkedTo: { type: 'string' },
          },
        },
        example: {
          name: 'John Doe Updated',
          email: 'updated_user@example.com',
          password: 'newpassword123',
          confirmPassword: 'newpassword123',
          telephone: '(11) 1234-5678',
          cellphone: '(11) 91234-5678',
          address: {
            street: 'Updated Street',
            neighborhood: 'Updated Neighborhood',
            city: 'Updated City',
            state: 'Updated State',
            zipCode: '01000-000',
            complement: 'Updated Complement',
          },
          linkedTo: 'updated_principal_user_id',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User updated successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              cpf: { type: 'string' },
              telephone: { type: 'string' },
              cellphone: { type: 'string' },
              address: {
                type: 'object',
                properties: {
                  street: { type: 'string' },
                  neighborhood: { type: 'string' },
                  city: { type: 'string' },
                  state: { type: 'string' },
                  zipCode: { type: 'string' },
                  complement: { type: 'string' },
                },
              },
              linkedTo: { type: 'string' },
            },
          },
          example: {
            id: 'user_id',
            name: 'John Doe Updated',
            email: 'updated_user@example.com',
            role: 'priest',
            cpf: '123.456.789-00',
            telephone: '(11) 1234-5678',
            cellphone: '(11) 91234-5678',
            address: {
              street: 'Updated Street',
              neighborhood: 'Updated Neighborhood',
              city: 'Updated City',
              state: 'Updated State',
              zipCode: '01000-000',
              complement: 'Updated Complement',
            },
            linkedTo: 'updated_principal_user_id',
          },
        },
      },
    },
    '400': {
      description: 'Invalid input data',
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

export { updateUser }
