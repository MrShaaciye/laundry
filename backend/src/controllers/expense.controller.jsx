`use strict`;
const db = require(`../models/index.jsx`);

// Import serviceModel, Sequelize, Op
const expenseModel = db.expenseModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Expense
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [expense, created] = await expenseModel.findOrCreate({ where: { name: req.body.name }, defaults: { note: req.body.note }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(expense)) : expense ? (await transactions.rollback(), res.status(500).json(`Expense with the same name already exists`)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Expenses
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        const note = req.body.note;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : note ? { note: { [Op.like]: `%${note}%` } } : null;
        const expenses = await expenseModel.findAndCountAll({
            attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return expenses ? (await transactions.commit(), res.status(200).json(expenses)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Expense by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const supply = await expenseModel.findOne({
            attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return supply ? (await transactions.commit(), res.status(200).json(supply)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Expense by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let expense;
        const findExpense = await expenseModel.findOne({ where: { name: req.body.name }, transaction: transactions });
        return findExpense ? (await transactions.rollback(), res.status(400).json(`Expense with the same name already exists`)) : ((expense = await expenseModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(expense)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Expense by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.restore({ where: { id: id }, transaction: transactions });
        return expense ? (await transactions.commit(), res.status(200).json(expense)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Expense by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.destroy({ where: { id: id }, transaction: transactions });
        return expense ? (await transactions.commit(), res.status(200).json(expense)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
