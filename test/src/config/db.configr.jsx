`use strict`;
// Database Configuration
module.exports = {
  DB: `test`,
  USER: `root`,
  PASSWORD: ``,
  HOST: `localhost`,
  DIALECT: `mysql`,
  LOGGING: console.log,
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
