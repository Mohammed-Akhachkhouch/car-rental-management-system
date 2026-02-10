require('dotenv').config();

const shared = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'car_rental_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  dialect: 'postgres',
  logging: false
};

const productionWithUrl = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false
};

if (process.env.DB_SSL === 'true') {
  productionWithUrl.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

module.exports = {
  development: shared,
  test: {
    ...shared,
    database: process.env.DB_TEST_NAME || 'car_rental_test'
  },
  production: process.env.DATABASE_URL ? productionWithUrl : shared
};


