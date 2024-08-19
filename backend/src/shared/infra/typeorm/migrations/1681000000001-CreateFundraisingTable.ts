import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateFundraisingTable1681000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fundraisings',
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
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'quantityAvailable',
            type: 'int',
          },
          {
            name: 'price',
            type: 'decimal',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'pixKeyCpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pixKeyCnpj',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pixKeyChaveAleatoria',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'fundraisings',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fundraisings')
  }
}
