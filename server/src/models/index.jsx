`use strict`;
const dbConfig = require(`../config/db.config.jsx`);
const { Sequelize, QueryTypes, DataTypes, Op } = require(`sequelize`);

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  logging: dbConfig.LOGGING,
  pool: {
    max: dbConfig.POOL.MAX,
    min: dbConfig.POOL.MIN,
    acquire: dbConfig.POOL.ACQUIRE,
    idle: dbConfig.POOL.IDLE,
  },
});

// Create Connection
sequelize
  .authenticate()
  .then(() => console.log(`Database Authenticated successfully!`))
  .catch((err) => console.log(`Unable to authenticate database ${err}`));

// Defining database
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.QueryTypes = QueryTypes;
db.DataTypes = DataTypes;
db.Op = Op;

// Import Models
db.customerModel = require(`./customer.model.jsx`)(sequelize, DataTypes);
db.employeeModel = require(`./employee.model.jsx`)(sequelize, DataTypes);
db.serviceModel = require(`./service.model.jsx`)(sequelize, DataTypes);
db.itemModel = require(`./item.model.jsx`)(sequelize, DataTypes);
db.priceModel = require(`./price.model.jsx`)(sequelize, DataTypes);
db.supplyModel = require(`./supply.model.jsx`)(sequelize, DataTypes);
db.orderModel = require(`./order.model.jsx`)(sequelize, DataTypes);
db.expenseModel = require(`./expense.model.jsx`)(sequelize, DataTypes);
db.paymentModel = require(`./payment.model.jsx`)(sequelize, DataTypes);
db.inventoryModel = require(`./inventory.model.jsx`)(sequelize, DataTypes);
db.deliveryModel = require(`./delivery.model.jsx`)(sequelize, DataTypes);
db.userModel = require(`./user.model.jsx`)(sequelize, DataTypes);
db.smsCustomerModel = require(`./smscustomer.model.jsx`)(sequelize, DataTypes);
db.smsEmployeeModel = require(`./smsemployee.model.jsx`)(sequelize, DataTypes);

// One to many Associations
// Order model
db.customerModel.hasMany(db.orderModel, { as: `orders`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.orderModel.belongsTo(db.customerModel, { as: `customers`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.employeeModel.hasMany(db.orderModel, { as: `orders`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.orderModel.belongsTo(db.employeeModel, { as: `employees`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.serviceModel.hasMany(db.orderModel, { as: `orders`, foreignKey: `serviceId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.orderModel.belongsTo(db.serviceModel, { as: `services`, foreignKey: `serviceId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.itemModel.hasMany(db.orderModel, { as: `orders`, foreignKey: `itemId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.orderModel.belongsTo(db.itemModel, { as: `items`, foreignKey: `itemId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.priceModel.hasMany(db.orderModel, { as: `orders`, foreignKey: `priceId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.orderModel.belongsTo(db.priceModel, { as: `prices`, foreignKey: `priceId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// Payment model
db.expenseModel.hasMany(db.paymentModel, { as: `payments`, foreignKey: `expenseId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.paymentModel.belongsTo(db.expenseModel, { as: `expenses`, foreignKey: `expenseId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// Inventory model
db.supplyModel.hasMany(db.inventoryModel, { as: `inventories`, foreignKey: `supplyId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.inventoryModel.belongsTo(db.supplyModel, { as: `supplies`, foreignKey: `supplyId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// Delivery model
db.customerModel.hasMany(db.deliveryModel, { as: `deliveries`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.deliveryModel.belongsTo(db.customerModel, { as: `customers`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.employeeModel.hasMany(db.deliveryModel, { as: `deliveries`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.deliveryModel.belongsTo(db.employeeModel, { as: `employees`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// SMS Customer model
db.customerModel.hasMany(db.smsCustomerModel, { as: `smsCustomers`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.smsCustomerModel.belongsTo(db.customerModel, { as: `customers`, foreignKey: `customerId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// SMS Employee model
db.employeeModel.hasMany(db.smsEmployeeModel, { as: `smsEmployees`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });
db.smsEmployeeModel.belongsTo(db.employeeModel, { as: `employees`, foreignKey: `employeeId`, onUpdate: `CASCADE`, onDelete: `CASCADE` });

// Create tables
db.sequelize
  .sync({ force: false, alter: true, match: /laundry$/ })
  .then(() => console.log(`Tables were synced successfully!`))
  .catch((err) => console.log(`Unable to sync Tables! ${err}`));

module.exports = db;
