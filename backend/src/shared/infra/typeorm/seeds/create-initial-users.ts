import { DataSource } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { hash } from 'bcryptjs'

export const createInitialUsers = async (dataSource: DataSource) => {
  const password = await hash('123456', 8)
  const manager = dataSource.manager

  await manager
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        name: 'Admin',
        role: 'pilgrim',
        email: 'admin@example.com',
        password,
        telephone: '123456789',
        cpf: '123.456.789-00', // Exemplo de CPF
        // cnpj: null, // Pode ser null ou omitido se não for necessário
        address: {
          street: 'Rua Exemplo',
          neighborhood: 'Bairro Exemplo',
          city: 'Cidade Exemplo',
          state: 'Estado Exemplo',
          zipCode: '12345-678',
          complement: 'Apto 101', // Opcional
        },
        // linkedTo: null, // Pode ser null ou omitido se não for necessário
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
    entities: [User],
  })

  await dataSource.initialize()
  await createInitialUsers(dataSource)
  await dataSource.destroy()
}

seed()
  .then(() => {
    console.log('Seeding completo')
  })
  .catch((error) => {
    console.error('Erro ao semear o banco de dados', error)
  })
