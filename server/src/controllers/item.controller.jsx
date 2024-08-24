`use strict`;
const db = require(`../models/index.jsx`);

// Import itemModel, Sequelize, Op
const itemModel = db.itemModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Item
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [item, created] = await itemModel.findOrCreate({ where: { name: req.body.name }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(item)) : (await transactions.rollback(), res.status(409).json(`Item with the same name already exists`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find All Items
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : null;
        const items = await itemModel.findAndCountAll({
            attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return await transactions.commit(), res.status(200).json(items);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Item by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const item = await itemModel.findOne({
            attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return item ? (await transactions.commit(), res.status(200).json(item)) : (await transactions.rollback(), res.status(404).json(`Item not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Update One Item by id if name exist
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const item = await itemModel.findOne({ where: { name: req.body.name }, transaction: transactions });
        return item ? (await transactions.rollback(), res.status(409).json(`Item with the same name already exists`)) : (await itemModel.update(req.body, { where: { id: id }, transaction: transactions }), (await transactions.commit(), res.status(200).json(item)));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Item by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const item = await itemModel.restore({ where: { id: id }, transaction: transactions });
        return item ? (await transactions.commit(), res.status(200).json(item)) : (await transactions.rollback(), res.status(404).json(`Item not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One Item by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const item = await itemModel.destroy({ where: { id: id }, transaction: transactions });
        return item ? (await transactions.commit(), res.status(200).json(item)) : (await transactions.rollback(), res.status(404).json(`Item not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
