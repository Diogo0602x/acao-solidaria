/* eslint-disable @typescript-eslint/no-var-requires */
const { DataSource } = require('typeorm')
const dotenv = require('dotenv')
dotenv.config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  ssl: false,
})

module.exports = { AppDataSource }
