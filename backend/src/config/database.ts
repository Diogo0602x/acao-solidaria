import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.DATABASE_URL_MONGO || ''

mongoose.connect(uri)

mongoose.connection.on('connected', () => {
  console.log('Database connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err}`)
})
