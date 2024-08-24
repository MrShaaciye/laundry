`use strict`;
const db = require(`../models/index.jsx`);

// Import inventoryModel, Sequelize, Op
const inventoryModel = db.inventoryModel;
const supplyModel = db.supplyModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Inventory
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const inventory = await inventoryModel.create({ supplyId: req.body.supplyId, quantity: req.body.quantity, type: req.body.type, note: req.body.note, transaction: transactions });
        return await transactions.commit(), res.status(201).json(inventory);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find All Inventories
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const supplyId = req.body.supplyId;
        const quantity = req.body.quantity;
        const type = req.body.type;
        const note = req.body.note;
        let finder = supplyId ? { supplyId: { [Op.like]: `%${supplyId}%` } } : quantity ? { quantity: { [Op.like]: `%${quantity}%` } } : type ? { type: { [Op.like]: `%${type}%` } } : note ? { note: { [Op.like]: `%${note}%` } } : null;
        const inventories = await inventoryModel.findAndCountAll({
            attributes: [`id`, `supplyId`, `quantity`, `type`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: supplyModel, as: `supplies`, attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return await transactions.commit(), res.status(200).json(inventories);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Inventory by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const inventory = await inventoryModel.findOne({
            attributes: [`id`, `supplyId`, `quantity`, `type`, `note`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [{ model: supplyModel, as: `supplies`, attributes: [`id`, `name`, `note`, `createdAt`, `updatedAt`, `deletedAt`] }],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return inventory ? (await transactions.commit(), res.status(200).json(inventory)) : (await transactions.rollback(), res.status(404).json(`Inventory not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Update One Inventory by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const inventory = await inventoryModel.update(req.body, { where: { id: id }, transaction: transactions });
        return await transactions.commit(), res.status(200).json(inventory);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Inventory by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const inventory = await inventoryModel.restore({ where: { id: id }, transaction: transactions });
        return inventory ? (await transactions.commit(), res.status(200).json(inventory)) : (await transactions.rollback(), res.status(404).json(`Inventory not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One Inventory by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const inventory = await inventoryModel.destroy({ where: { id: id }, transaction: transactions });
        return inventory ? (await transactions.commit(), res.status(200).json(inventory)) : (await transactions.rollback(), res.status(404).json(`Inventory not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
