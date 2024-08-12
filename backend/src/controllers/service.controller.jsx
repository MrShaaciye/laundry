`use strict`;
const db = require(`../models/index.jsx`);

// Import serviceModel, Sequelize, Op
const serviceModel = db.serviceModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create Service
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [service, created] = await serviceModel.findOrCreate({ where: { name: req.body.name }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(service)) : service ? (await transactions.rollback(), res.status(500).json(`Service with the same name already exists`)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Services
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : null;
        const services = await serviceModel.findAndCountAll({
            attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return services ? (await transactions.commit(), res.status(200).json(services)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Service by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const service = await serviceModel.findOne({
            attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return service ? (await transactions.commit(), res.status(200).json(service)) : await transactions.rollback(), res.status(404).json(`Service not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Service by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let service;
        const findService = await serviceModel.findOne({ where: { name: req.body.name }, transaction: transactions });
        return findService ? (await transactions.rollback(), res.status(400).json(`Service with the same name already exists`)) : ((service = await serviceModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(service)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Service by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const service = await serviceModel.restore({ where: { id: id }, transaction: transactions });
        return service ? (await transactions.commit(), res.status(200).json(service)) : await transactions.rollback(), res.status(404).json(`Service not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Service by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const service = await serviceModel.destroy({ where: { id: id }, transaction: transactions });
        return service ? (await transactions.commit(), res.status(200).json(service)) : await transactions.rollback(), res.status(404).json(`Service not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
