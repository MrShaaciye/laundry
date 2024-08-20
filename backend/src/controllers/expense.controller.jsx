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
        return created ? (await transactions.commit(), res.status(201).json(expense)) : (await transactions.rollback(), res.status(404).json(`Expense with the same name already exists`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
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
        return await transactions.commit(), res.status(200).json(expenses);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Expense by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.findOne({
            attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return expense ? (await transactions.commit(), res.status(200).json(expense)) : (await transactions.rollback(), res.status(404).json(`Expense not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Update One Expense by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.findOne({ where: { name: req.body.name }, transaction: transactions });
        return expense ? (await transactions.rollback(), res.status(400).json(`Expense with the same name already exists`)) : (await expenseModel.update(req.body, { where: { id: id }, transaction: transactions }), (await transactions.commit(), res.status(200).json(expense)));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Expense by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.restore({ where: { id: id }, transaction: transactions });
        return expense ? (await transactions.commit(), res.status(200).json(expense)) : (await transactions.rollback(), res.status(404).json(`Expense not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One Expense by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const expense = await expenseModel.destroy({ where: { id: id }, transaction: transactions });
        return expense ? (await transactions.commit(), res.status(200).json(expense)) : (await transactions.rollback(), res.status(404).json(`Expense not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
