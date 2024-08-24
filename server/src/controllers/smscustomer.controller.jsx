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
        return await transactions.commit(), res.status(201).json(smsCustomer);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
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
        return await transactions.commit(), res.status(200).json(smsCustomers);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
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
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : (await transactions.rollback(), res.status(404).json(`SMS Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Update One SMS Customer by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.update(req.body, { where: { id: id }, transaction: transactions });
        return await transactions.commit(), res.status(200).json(smsCustomer);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One SMS Customer by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.restore({ where: { id: id }, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : (await transactions.rollback(), res.status(404).json(`SMS Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One SMS Customer by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const smsCustomer = await smsCustomerModel.destroy({ where: { id: id }, transaction: transactions });
        return smsCustomer ? (await transactions.commit(), res.status(200).json(smsCustomer)) : (await transactions.rollback(), res.status(404).json(`SMS Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
