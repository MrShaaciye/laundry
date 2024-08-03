`use strict`;
const db = require(`../models/index.jsx`);

// Import smsEmployeeModel, Sequelize, Op
const smsEmployeeModel = db.smsEmployeeModel;
const employeeModel = db.employeeModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create SMS Employee
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const smsEmployee = await smsEmployeeModel.create({ employeeId: req.body.employeeId, body: req.body.body, transaction: transactions });
        return smsEmployee ? (await transactions.commit(), res.status(201).json(smsEmployee)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All SMS Employee
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const body = req.body.body;
        let finder = body ? { body: { [Op.like]: `%${body}%` } } : null;
        const smsEmployees = await smsEmployeeModel.findAndCountAll({
            attributes: [`id`, `employeeId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return smsEmployees ? (await transactions.commit(), res.status(200).json(smsEmployees)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One SMS Employee by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsEmployee = await smsEmployeeModel.findOne({
            attributes: [`id`, `employeeId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One SMS Employee by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsEmployee = await smsEmployeeModel.update(req.body, { where: { id: id }, transaction: transactions });
        return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One SMS Employee by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsEmployee = await smsEmployeeModel.restore({ where: { id: id }, transaction: transactions });
        return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One SMS Employee by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsEmployee = await smsEmployeeModel.destroy({ where: { id: id }, transaction: transactions });
        return smsEmployee ? (await transactions.commit(), res.status(200).json(smsEmployee)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
