import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DATABASE_URL_MONGO || ''

mongoose
  .connect(uri, {} as mongoose.ConnectOptions)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`)
  })

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB Cluster')
})

mongoose.connection.on('error', (error) => {
  console.error(`Mongoose connection error: ${error}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

export { mongoose }
