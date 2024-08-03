`use strict`;
module.exports = {
    // DB: `ORCLPDB`,
    // USER: `halaqaty`,
    // PASSWORD: `656369`,
    // HOST: `localhost`,
    // DIALECT: `oracle`,

    DB: `laundry`,
    USER: `root`,
    PASSWORD: ``,
    HOST: `localhost`,
    DIALECT: `mysql`,

    // DB: `halaqaty`,
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
