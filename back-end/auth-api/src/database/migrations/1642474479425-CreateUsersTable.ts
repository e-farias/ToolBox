import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1642474479425 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

		await queryRunner.createTable( new Table ({
			name: "users",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					default: "uuid_generate_v4()"
				},
				{
					name: "username",
					type: "varchar",
					isNullable: false,
					isUnique: true,
				},
				{
					name: "name",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "email",
					type: "varchar",
					isNullable: true,
					isUnique: true,
				},
				{
					name: "phone",
					type: "varchar",
					isNullable: false,
					isUnique: true,
				},
				{
					name: "role",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "password",
					type: "varchar",
					isNullable: false,
				},
				{
					name: "created_at",
					type: "timestamp",
					isNullable: false,
					default: "CURRENT_TIMESTAMP"
				},
				{
					name: "updated_at",
					type: "timestamp",
					isNullable: true,
				},
				{
					name: "deleted_at",
					type: "timestamp",
					isNullable: true,
				},
			]
		}))

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
		await queryRunner.query("DROP EXTENSION 'uuid-ossp'");
	}

}
