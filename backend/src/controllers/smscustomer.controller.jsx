`use strict`;
const db = require(`../models/index.jsx`);

// Import smsCustomerModel, Sequelize, Op
const smsCustomerModel = db.smsCustomerModel;
const customerModel = db.customerModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create SMS Customer
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const smsCustomer = await smsCustomerModel.create({ customerId: req.body.customerId, body: req.body.body, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(201).json(smsCustomer)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All SMS Customers
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const body = req.body.body;
        let finder = body ? { body: { [Op.like]: `%${body}%` } } : null;
        const smsCustomers = await smsCustomerModel.findAndCountAll({
            attributes: [`id`, `customerId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return smsCustomers ? (await transactions.commit(), res.status(200).json(smsCustomers)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One SMS Customer by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.findOne({
            attributes: [`id`, `customerId`, `body`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One SMS Customer by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.update(req.body, { where: { id: id }, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One SMS Customer by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.restore({ where: { id: id }, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One SMS Customer by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.destroy({ where: { id: id }, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
