`use strict`;
const db = require(`../models/index.jsx`);

// Import deliveryModel, Sequelize, Op
const deliveryModel = db.deliveryModel;
const customerModel = db.customerModel;
const employeeModel = db.employeeModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Delivery Delivery
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const delivery = await deliveryModel.create({ customerId: req.body.customerId, employeeId: req.body.employeeId, fee: req.body.fee, note: req.body.note, transaction: transactions });
        return delivery ? (await transactions.commit(), res.status(201).json(delivery)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Deliveries
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const fee = req.body.fee;
        const note = req.body.note;
        let finder = fee ? { fee: { [Op.like]: `%${fee}%` } } : note ? { note: { [Op.like]: `%${note}%` } } : null;
        const delivery = await deliveryModel.findAndCountAll({
            attributes: [`id`, `customerId`, `employeeId`, `fee`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [
                { model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] },
            ],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return delivery ? (await transactions.commit(), res.status(200).json(delivery)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Delivery by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const delivery = await deliveryModel.findOne({
            attributes: [`id`, `customerId`, `employeeId`, `fee`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [
                { model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] },
            ],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return delivery ? (await transactions.commit(), res.status(200).json(delivery)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Delivery by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const delivery = await deliveryModel.update(req.body, { where: { id: id }, transaction: transactions });
        return delivery ? (await transactions.commit(), res.status(200).json(delivery)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Delivery by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const delivery = await deliveryModel.restore({ where: { id: id }, transaction: transactions });
        return delivery ? (await transactions.commit(), res.status(200).json(delivery)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Delivery by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const delivery = await deliveryModel.destroy({ where: { id: id }, transaction: transactions });
        return delivery ? (await transactions.commit(), res.status(200).json(delivery)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
