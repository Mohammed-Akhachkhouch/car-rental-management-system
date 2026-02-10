const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./db/models');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    app.listen(env.port, () => {
      console.log(`Backend server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start backend server.', error.message);
    process.exit(1);
  }
};

startServer();


