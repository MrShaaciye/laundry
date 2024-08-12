`use strict`;
const db = require(`../models/index.jsx`);

// Import itemModel, Sequelize, Op
const paymentModel = db.paymentModel;
const expenseModel = db.expenseModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Payment
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const payment = await paymentModel.create({ expenseId: req.body.expenseId, date: req.body.date, amount: req.body.amount, note: req.body.note, transaction: transactions });
        return payment ? (await transactions.commit(), res.status(201).json(payment)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Payments
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const date = req.body.date;
        const amount = req.body.amount;
        const note = req.body.note;
        let finder = date ? { date: { [Op.like]: `%${date}%` } } : amount ? { amount: { [Op.like]: `%${amount}%` } } : note ? { note: { [Op.like]: `%${note}%` } } : null;
        const prices = await paymentModel.findAndCountAll({
            attributes: [`id`, `expenseId`, `date`, `amount`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: expenseModel, as: `expenses`, attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return prices ? (await transactions.commit(), res.status(200).json(prices)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Payment by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const payment = await paymentModel.findOne({
            attributes: [`id`, `expenseId`, `date`, `amount`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: expenseModel, as: `expenses`, attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return payment ? (await transactions.commit(), res.status(200).json(payment)) : await transactions.rollback(), res.status(404).json(`Payment not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Payment by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const payment = await paymentModel.update(req.body, { where: { id: id }, transaction: transactions });
        return payment ? (await transactions.commit(), res.status(200).json(payment)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Payment by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const payment = await paymentModel.restore({ where: { id: id }, transaction: transactions });
        return payment ? (await transactions.commit(), res.status(200).json(payment)) : await transactions.rollback(), res.status(404).json(`Payment not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Payment by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const payment = await paymentModel.destroy({ where: { id: id }, transaction: transactions });
        return payment ? (await transactions.commit(), res.status(200).json(payment)) : await transactions.rollback(), res.status(404).json(`Payment not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
