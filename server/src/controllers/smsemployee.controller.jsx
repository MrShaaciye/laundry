`use strict`;
const db = require(`../models/index.jsx`);

// Import smsEmployeeModel, Sequelize, Op
const SMSEmployeeModel = db.SMSEmployeeModel;
const employeeModel = db.employeeModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create SMS Employee
exports.create = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const smsEmployee = await SMSEmployeeModel.create({ employeeId: req.body.employeeId, body: req.body.body, transaction: transactions });
    return await transactions.commit(), res.status(201).json(smsEmployee);
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Find All SMS Employee
exports.findAll = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const body = req.body.body;
    let finder = body ? { body: { [Op.like]: `%${body}%` } } : null;
    const smsEmployees = await SMSEmployeeModel.findAndCountAll({
      attributes: [`id`, `employeeId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
      include: [{ model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] }],
      transaction: transactions,
      lock: false,
      paranoid: false,
      order: [[`id`, `DESC`]],
      where: finder,
    });
    return await transactions.commit(), res.status(200).json(smsEmployees);
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Find One SMS Employee by id
exports.findOne = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const smsEmployee = await SMSEmployeeModel.findOne({
      attributes: [`id`, `employeeId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
      include: [{ model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] }],
      transaction: transactions,
      lock: false,
      paranoid: false,
      where: { id: id },
    });
    return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : (await transactions.rollback(), res.status(404).json(`SMS Employee not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Update One SMS Employee by id
exports.update = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const smsEmployee = await SMSEmployeeModel.update(req.body, { where: { id: id }, transaction: transactions });
    return await transactions.commit(), res.status(200).json(smsEmployee);
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Restore One SMS Employee by id
exports.restore = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const smsEmployee = await SMSEmployeeModel.restore({ where: { id: id }, transaction: transactions });
    return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : (await transactions.rollback(), res.status(404).json(`SMS Employee not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Delete One SMS Employee by id
exports.delete = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const smsEmployee = await SMSEmployeeModel.destroy({ where: { id: id }, transaction: transactions });
    return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : (await transactions.rollback(), res.status(404).json(`SMS Employee not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};
