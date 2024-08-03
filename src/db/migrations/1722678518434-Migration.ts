import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722678518434 implements MigrationInterface {
    name = 'Migration1722678518434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`application\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`job_posting_id\` int NULL, UNIQUE INDEX \`REL_42f0935cc814e694ed0e61fdec\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_posting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`position\` varchar(200) NOT NULL, \`description\` text NOT NULL, \`stack\` varchar(255) NOT NULL, \`reward\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`nation\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, UNIQUE INDEX \`REL_879141ebc259b4c0544b3f1ea4\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_42f0935cc814e694ed0e61fdece\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_835972145eea484a9c7e0390b30\` FOREIGN KEY (\`job_posting_id\`) REFERENCES \`job_posting\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_posting\` ADD CONSTRAINT \`FK_fe0a1a54625b2dc48cdfb76d6d9\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_879141ebc259b4c0544b3f1ea4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_879141ebc259b4c0544b3f1ea4c\``);
        await queryRunner.query(`ALTER TABLE \`job_posting\` DROP FOREIGN KEY \`FK_fe0a1a54625b2dc48cdfb76d6d9\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_835972145eea484a9c7e0390b30\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_42f0935cc814e694ed0e61fdece\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_879141ebc259b4c0544b3f1ea4\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`job_posting\``);
        await queryRunner.query(`DROP INDEX \`REL_42f0935cc814e694ed0e61fdec\` ON \`application\``);
        await queryRunner.query(`DROP TABLE \`application\``);
    }

}
