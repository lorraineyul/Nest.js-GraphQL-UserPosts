import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeOrmConfig:PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'velvetdionysus',
  password: 'password',
  database: 'userposts',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  // dropSchema: true
  // drop the database schema and recreate it whenever the application starts
}