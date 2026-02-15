const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./db/models');

let httpServer;
let shuttingDown = false;

const closeServer = () =>
  new Promise((resolve, reject) => {
    if (!httpServer) {
      resolve();
      return;
    }

    httpServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

const shutdown = async (signal, exitCode = 0) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`${signal} received. Shutting down gracefully...`);

  try {
    await closeServer();
    await sequelize.close();
  } catch (error) {
    console.error('Graceful shutdown failed.', error.message);
    process.exit(1);
  }

  process.exit(exitCode);
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    httpServer = app.listen(env.port, () => {
      console.log(`Backend server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start backend server.', error.message);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection detected.', reason);
  shutdown('unhandledRejection', 1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception detected.', error);
  shutdown('uncaughtException', 1);
});

startServer();


