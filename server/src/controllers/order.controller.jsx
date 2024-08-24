`use strict`;
const db = require(`../models/index.jsx`);

// Import orderModel, Sequelize, Op
const orderModel = db.orderModel;
const customerModel = db.customerModel;
const employeeModel = db.employeeModel;
const serviceModel = db.serviceModel;
const itemModel = db.itemModel;
const priceModel = db.priceModel;

const sequelize = db.sequelize;
const Op = db.Op;

// Create Order
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const order = await orderModel.create({ bringDate: req.body.bringDate, collectDate: req.body.collectDate, customerId: req.body.customerId, employeeId: req.body.employeeId, serviceId: req.body.serviceId, itemId: req.body.itemId, priceId: req.body.priceId, quantity: req.body.quantity, amount: req.body.amount, pickupFee: req.body.pickupFee, totalAmount: req.body.totalAmount, paidAmount: req.body.paidAmount, balance: req.body.balance, paymentType: req.body.paymentType, paymentStatus: req.body.paymentStatus, transaction: transactions });
        return await transactions.commit(), res.status(201).json(order);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find All Orders
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const bringDate = req.body.bringDate;
        const collectDate = req.body.collectDate;
        const paymentType = req.body.paymentType;
        const paymentStatus = req.body.paymentStatus;
        let finder = bringDate ? { bringDate: { [Op.like]: `%${bringDate}%` } } : collectDate ? { collectDate: { [Op.like]: `%${collectDate}%` } } : paymentType ? { paymentType: { [Op.like]: `%${paymentType}%` } } : paymentStatus ? { paymentStatus: { [Op.like]: `%${paymentStatus}%` } } : null;
        const orders = await orderModel.findAndCountAll({
            attributes: [`id`, `bringDate`, `collectDate`, `customerId`, `employeeId`, `serviceId`, `itemId`, `priceId`, `quantity`, `amount`, `pickupFee`, `totalAmount`, `paidAmount`, `balance`, `paymentType`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [
                { model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: serviceModel, as: `services`, attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: itemModel, as: `items`, attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: priceModel, as: `prices`, attributes: [`id`, `type`, `cost`, `createdAt`, `updatedAt`, `deletedAt`] },
            ],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return await transactions.commit(), res.status(200).json(orders);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Order  by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const order = await orderModel.findOne({
            attributes: [`id`, `bringDate`, `collectDate`, `customerId`, `employeeId`, `serviceId`, `itemId`, `priceId`, `quantity`, `amount`, `pickupFee`, `totalAmount`, `paidAmount`, `balance`, `paymentType`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`],
            include: [
                { model: customerModel, as: `customers`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: employeeModel, as: `employees`, attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: serviceModel, as: `services`, attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: itemModel, as: `items`, attributes: [`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`] },
                { model: priceModel, as: `prices`, attributes: [`id`, `type`, `cost`, `createdAt`, `updatedAt`, `deletedAt`] },
            ],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return order ? (await transactions.commit(), res.status(200).json(order)) : (await transactions.rollback(), res.status(404).json(`Order not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Order  by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const order = await orderModel.update(req.body, { where: { id: id }, transaction: transactions });
        return await transactions.commit(), res.status(200).json(order);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Order  by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const order = await orderModel.restore({ where: { id: id }, transaction: transactions });
        return order ? (await transactions.commit(), res.status(200).json(order)) : (await transactions.rollback(), res.status(404).json(`Order not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Delete One Order  by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const order = await orderModel.destroy({ where: { id: id }, transaction: transactions });
        return order ? (await transactions.commit(), res.status(200).json(order)) : (await transactions.rollback(), res.status(404).json(`Order not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
