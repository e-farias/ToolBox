import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersRolesTable1642475548872 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable( new Table ({
			name: "users_roles",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: "uuid",
					isNullable: false,
				},
				{
					name: "role",
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
		await queryRunner.dropTable("users_roles");
	}

}
