import * as dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './persistence/sequelize';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
