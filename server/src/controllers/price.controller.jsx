`use strict`;
const db = require(`../models/index.jsx`);

// Import itemModel, Sequelize, Op
const priceModel = db.priceModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Price
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [price, created] = await priceModel.findOrCreate({ where: { type: req.body.type }, defaults: { cost: req.body.cost }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(price)) : (await transactions.rollback(), res.status(409).json(`Price with the same type already exists`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find All Prices
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
        return await transactions.commit(), res.status(200).json(prices);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Price by id
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
        return price ? (await transactions.commit(), res.status(200).json(price)) : (await transactions.rollback(), res.status(404).json(`Price not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err).message;
    }
};

// Update One Price by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.findOne({ where: { type: req.body.type, cost: req.body.cost }, transaction: transactions });
        return price ? (await transactions.rollback(), res.status(409).json(`Price with the same type already exists`)) : (await priceModel.update(req.body, { where: { id: id }, transaction: transactions }), (await transactions.commit(), res.status(200).json(price)));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Price by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.restore({ where: { id: id }, transaction: transactions });
        return price ? (await transactions.commit(), res.status(200).json(price)) : (await transactions.rollback(), res.status(404).json(`Price not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One Price by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const price = await priceModel.destroy({ where: { id: id }, transaction: transactions });
        return price ? (await transactions.commit(), res.status(200).json(price)) : (await transactions.rollback(), res.status(404).json(`Price not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
