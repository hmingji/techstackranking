import { Dialect, Sequelize } from 'sequelize';
import config from '../../config/config';
import pg from 'pg';

const env = process.env.NODE_ENV || 'development';
let dbConfig;

if (env === 'development') {
  dbConfig = config.development;
} else {
  dbConfig = config.production;
}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as Dialect,
    dialectModule: pg,
  }
);

export { sequelize };
