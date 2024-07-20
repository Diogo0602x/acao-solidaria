import 'reflect-metadata'
import express from 'express'
import { routes } from '@shared/infra/http/routes'
import '@config/database'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log('Server started on port 3333')
})
