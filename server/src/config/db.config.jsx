`use strict`;
module.exports = {
  // DB: `ORCLPDB`,
  // USER: `laundry`,
  // PASSWORD: `656369`,
  // HOST: `localhost`,
  // DIALECT: `oracle`,

  DB: process.env.DB,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT,

  // DB: `laundry`,
  // USER: `sa`,
  // PASSWORD: `123`,
  // HOST: `localhost`,
  // DIALECT: `mssql`,

  LOGGING: console.log,
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
