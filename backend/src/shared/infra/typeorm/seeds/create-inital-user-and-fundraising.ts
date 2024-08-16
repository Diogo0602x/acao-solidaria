import { DataSource } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Fundraising } from '@fundraising/entities/fundraising.entity'
import { hash } from 'bcryptjs'

export const createInitialUserAndFundraising = async (
  dataSource: DataSource,
) => {
  const password = await hash('123456', 8)
  const manager = dataSource.manager

  // Create Users
  const users = await manager
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
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
      },
      {
        name: 'User 1',
        role: 'seminary',
        email: 'user1@example.com',
        password,
        telephone: '987654321',
        cnpj: '98.765.432/0001-99',
        address: {
          street: 'Outra Rua',
          neighborhood: 'Outro Bairro',
          city: 'Outra Cidade',
          state: 'Outro Estado',
          zipCode: '98765-432',
        },
      },
    ])
    .returning('*')
    .execute()

  const [adminUser, user1] = users.generatedMaps as User[]

  // Create Fundraisings for each user
  await manager
    .createQueryBuilder()
    .insert()
    .into(Fundraising)
    .values([
      {
        name: 'Fundraising 1',
        quantity: 100,
        quantityAvailable: 100,
        price: 50.0,
        image: 'path/to/image1.jpg',
        pixKeyCnpj: adminUser.cnpj,
        user: Promise.resolve(adminUser), // Wrap in Promise
      },
      {
        name: 'Fundraising 2',
        quantity: 200,
        quantityAvailable: 200,
        price: 100.0,
        image: 'path/to/image2.jpg',
        pixKeyCnpj: user1.cnpj,
        user: Promise.resolve(user1), // Wrap in Promise
      },
    ])
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
    entities: [User, Fundraising],
  })

  await dataSource.initialize()
  await createInitialUserAndFundraising(dataSource)
  await dataSource.destroy()
}

seed()
  .then(() => {
    console.log('Seeding completo')
  })
  .catch((error) => {
    console.error('Erro ao semear o banco de dados', error)
  })
