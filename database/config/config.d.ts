import { Dialect } from 'sequelize';

declare const config: {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
};

export = config;
