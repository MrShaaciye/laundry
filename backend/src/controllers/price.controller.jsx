`use strict`;
const db = require(`../models/index.jsx`);

// Import itemModel, Sequelize, Op
const priceModel = db.priceModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Service
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [price, created] = await priceModel.findOrCreate({ where: { type: req.body.type }, defaults: { cost: req.body.cost }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(price)) : price ? (await transactions.rollback(), res.status(500).json(`Price with the same type already exists`)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Items
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const type = req.body.type;
        const cost = req.body.cost;
        let finder = type ? { type: { [Op.like]: `%${type}%` } } : cost ? { cost: { [Op.like]: `%${cost}%` } } : null;
        const prices = await priceModel.findAndCountAll({
            attributes: [`id`, `type`, `cost`, `createdAt`, `updatedAt`, `deletedAt`],
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

// Find One Service by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.findOne({
            attributes: [`id`, `type`, `cost`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return price ? (await transactions.commit(), res.status(200).json(price)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(404).json(err);
    }
};

// Update One Service by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let price;
        const findPrice = await priceModel.findOne({ where: { type: req.body.type, cost: req.body.cost }, transaction: transactions });
        return findPrice ? (await transactions.rollback(), res.status(400).json(`Price with the same type already exists`)) : ((price = await priceModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(price)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(404).json(message);
    }
};

// Restore One Service by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.restore({ where: { id: id }, transaction: transactions });
        return price ? (await transactions.commit(), res.status(200).json(price)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(404).json(err);
    }
};

// Delete One Service by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.destroy({ where: { id: id }, transaction: transactions });
        return price ? (await transactions.commit(), res.status(200).json(price)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(404).json(err);
    }
};
