const isDev = process.env.APP_ENV === 'dev'

const params = {
  type: process.env.DATABASE_CONNECTION,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: process.env.DATABASE_PORT,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  seeds: [process.env.DATABASE_SEEDS],
  cli: {
    migrationsDir: process.env.DATABASE_MIGRATIONS_DIR,
  },
}

let paramsMongo = {
  name: 'mongo',
  type: process.env.DATABASE_CONNECTION_MONGO,
  host: process.env.DATABASE_HOST_MONGO,
  database: process.env.DATABASE_DATABASE_MONGO,
  port: process.env.DATABASE_PORT_MONGO,
  entities: [process.env.DATABASE_ENTITIES_MONGO],
  useUnifiedTopology: true,
}

if (!isDev) {
  Object.assign(params, {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  })

  paramsMongo = {
    name: 'mongo',
    type: process.env.DATABASE_CONNECTION_MONGO,
    url: process.env.DATABASE_URL_MONGO,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [process.env.DATABASE_ENTITIES_MONGO],
    useUnifiedTopology: true,
    writeConcern: {
      j: true,
    },
  }
}

module.exports = [params, paramsMongo]
