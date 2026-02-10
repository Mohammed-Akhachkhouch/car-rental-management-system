const { Sequelize } = require('sequelize');
const env = require('./env');

const baseOptions = {
  dialect: 'postgres',
  logging: env.db.logging ? console.log : false
};

const sequelize = env.databaseUrl
  ? new Sequelize(env.databaseUrl, baseOptions)
  : new Sequelize(env.db.name, env.db.user, env.db.password, {
      ...baseOptions,
      host: env.db.host,
      port: env.db.port
    });

module.exports = sequelize;


