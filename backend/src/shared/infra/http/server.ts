import 'reflect-metadata'
import express from 'express'
import { routes } from '@shared/infra/http/routes'
import '@config/database'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { docsConfig } from '@docs/docs-config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docsConfig))

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
