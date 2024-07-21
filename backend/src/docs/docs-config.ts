import { infoApi } from '@docs/info-api'
import { routes } from '@docs/routes'

import { serversApi } from '@docs/servers-api'

export const docsConfig = {
  openapi: '3.0.1',
  info: infoApi,
  servers: serversApi,
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: 'Users',
    },
    {
      name: 'Fundraising',
    },
  ],
  paths: routes,
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
}
