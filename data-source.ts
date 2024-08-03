import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'wanted',
  username: 'root',
  password: 'admin',
  logging: true,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
