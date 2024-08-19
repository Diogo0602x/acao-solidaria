import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1681000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            default: "'pilgrim'",
          },
          {
            name: 'pixKeyChaveAleatoria',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linkedTo',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
