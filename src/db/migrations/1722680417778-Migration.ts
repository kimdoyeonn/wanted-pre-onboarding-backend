import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722680417778 implements MigrationInterface {
    name = 'Migration1722680417778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_42f0935cc814e694ed0e61fdece\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_835972145eea484a9c7e0390b30\``);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`job_posting_id\` \`job_posting_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_posting\` DROP FOREIGN KEY \`FK_fe0a1a54625b2dc48cdfb76d6d9\``);
        await queryRunner.query(`ALTER TABLE \`job_posting\` CHANGE \`company_id\` \`company_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_879141ebc259b4c0544b3f1ea4c\``);
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_879141ebc259b4c0544b3f1ea4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_posting\` CHANGE \`company_id\` \`company_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`job_posting\` ADD CONSTRAINT \`FK_fe0a1a54625b2dc48cdfb76d6d9\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`job_posting_id\` \`job_posting_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`application\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_835972145eea484a9c7e0390b30\` FOREIGN KEY (\`job_posting_id\`) REFERENCES \`job_posting\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_42f0935cc814e694ed0e61fdece\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
