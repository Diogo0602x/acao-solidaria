import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { infoApi } from './info-api'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(infoApi.title)
    .setDescription(infoApi.description)
    .setVersion(infoApi.version)
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'ApiKeyAuth',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  })

  SwaggerModule.setup('api-docs', app, document)
}
