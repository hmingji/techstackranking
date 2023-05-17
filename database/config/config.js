require('dotenv').config();

const config = {
  development: {
    username: process.env.LOCALDB_USER ?? '',
    password: process.env.LOCALDB_PW ?? '',
    database: process.env.LOCALDB_NAME ?? '',
    host: process.env.LOCALDB_HOST ?? '',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PRODDB_USER ?? '',
    password: process.env.PRODDB_PW ?? '',
    database: process.env.PRODDB_NAME ?? '',
    host: process.env.PRODDB_HOST ?? '',
    dialect: 'postgres',
  },
};
module.exports = config;
