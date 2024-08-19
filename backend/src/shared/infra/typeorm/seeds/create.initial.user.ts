import { DataSource } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { Purchase } from '@/modules/fundraising/entities/purchase.entity' // Include the Purchase entity
import { hash } from 'bcryptjs'

export const createInitialUser = async (dataSource: DataSource) => {
  const password = await hash('123456', 8)
  const manager = dataSource.manager

  // Create a single user with role "church"
  await manager
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: 'Admin',
      role: 'church',
      email: 'admin@example.com',
      password,
      telephone: '123456789',
      cnpj: '12.345.678/0001-99',
      address: {
        street: 'Rua Exemplo',
        neighborhood: 'Bairro Exemplo',
        city: 'Cidade Exemplo',
        state: 'Estado Exemplo',
        zipCode: '12345-678',
        complement: 'Apto 101',
      },
      pixKeyChaveAleatoria: 'chave-aleatoria',
    })
    .execute()
}

const seed = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'acao-solidaria',
    entities: [User, Fundraising, Purchase], // Include User, Fundraising, and Purchase entities
  })

  await dataSource.initialize()
  await createInitialUser(dataSource)
  await dataSource.destroy()
}

seed()
  .then(() => {
    console.log('Seeding completo')
  })
  .catch((error) => {
    console.error('Erro ao semear o banco de dados', error)
  })
