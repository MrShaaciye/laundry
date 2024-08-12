`use strict`;
const db = require(`../models/index.jsx`);

// Import supplyModel, Sequelize, Op
const supplyModel = db.supplyModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Supply
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [supply, created] = await supplyModel.findOrCreate({ where: { name: req.body.name }, defaults: { note: req.body.note }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(supply)) : supply ? (await transactions.rollback(), res.status(500).json(`Supply with the same name already exists`)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Supplies
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        const note = req.body.note;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : note ? { note: { [Op.like]: `%${note}%` } } : null;
        const supplies = await supplyModel.findAndCountAll({
            attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return supplies ? (await transactions.commit(), res.status(200).json(supplies)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Supply by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const supply = await supplyModel.findOne({
            attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return supply ? (await transactions.commit(), res.status(200).json(supply)) : await transactions.rollback(), res.status(404).json(`Supply not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Supply by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let supply;
        const findSupply = await supplyModel.findOne({ where: { name: req.body.name }, transaction: transactions });
        return findSupply ? (await transactions.rollback(), res.status(400).json(`Supply with the same name already exists`)) : ((supply = await supplyModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(supply)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Supply by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const supply = await supplyModel.restore({ where: { id: id }, transaction: transactions });
        return supply ? (await transactions.commit(), res.status(200).json(supply)) : await transactions.rollback(), res.status(404).json(`Supply not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Supply by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const supply = await supplyModel.destroy({ where: { id: id }, transaction: transactions });
        return supply ? (await transactions.commit(), res.status(200).json(supply)) : await transactions.rollback(), res.status(404).json(`Supply not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
