import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  cpf?: string

  @Column({ nullable: true })
  cnpj?: string

  @Column()
  telephone: string

  @Column('jsonb', { nullable: true })
  address?: {
    street: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    complement?: string
  }

  @Column({ default: 'pilgrim' })
  role: string

  @Column({ nullable: true })
  linkedTo?: string
}
