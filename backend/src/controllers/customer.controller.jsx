`use strict`;
const db = require(`../models/index.jsx`);
const xlsx = require(`xlsx`);

// Import centerModel, Sequelize, Op
const customerModel = db.customerModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Bulk Create Customer
exports.bulkCreate = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const workbook = xlsx.read(req.file.buffer, { type: `buffer` }); // Read the Excel file buffer using xlsx library
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]); // Convert the worksheet to JSON format
        const names = data.map(customer => customer.name); // Get the names of the customers from the data array
        const phones = data.map(customer => customer.phone); // Get the phone numbers of the customers from the data array
        let customers;
        const existingCustomers = await customerModel.findAll({ where: { [Op.and]: [{ name: { [Op.in]: names } }, { phone: { [Op.in]: phones } }] }, defaults: { gender: req.body.gender, address: req.body.address, depositAmount: req.body.depositAmount, allowedUnit: req.body.allowedUnit, paymentStatus: req.body.paymentStatus } }); // Find existing customers
        return existingCustomers.length > 0 ? (await transactions.rollback(), res.status(400).json(`Customers with the same name and phone already exist`)) : ((customers = await customerModel.bulkCreate(data, { transaction: transactions })), (await transactions.commit(), res.status(201).json(customers))); // Create customers using Sequelize bulkCreate method
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Create Customer
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [customer, created] = await customerModel.findOrCreate({ where: { name: req.body.name, phone: req.body.phone }, defaults: { gender: req.body.gender, address: req.body.address, depositAmount: req.body.depositAmount, allowedUnit: req.body.allowedUnit, paymentStatus: req.body.paymentStatus }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(customer)) : (await transactions.rollback(), res.status(404).json(`Customer with the same name and phone already exists`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find All Customers
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        const gender = req.body.gender;
        const address = req.body.address;
        const phone = req.body.phone;
        const depositAmount = req.body.depositAmount;
        const allowedUnit = req.body.allowedUnit;
        const paymentStatus = req.body.paymentStatus;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : gender ? { gender: { [Op.like]: `%${gender}%` } } : address ? { address: { [Op.like]: `%${address}%` } } : phone ? { phone: { [Op.like]: `%${phone}%` } } : depositAmount ? { depositAmount: { [Op.like]: `%${depositAmount}%` } } : allowedUnit ? { allowedUnit: { [Op.like]: `%${allowedUnit}%` } } : paymentStatus ? { paymentStatus: { [Op.like]: `%${paymentStatus}%` } } : null;
        const customers = await customerModel.findAndCountAll({
            attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return await transactions.commit(), res.status(200).json(customers);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Find One Customer by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const customer = await customerModel.findOne({
            attributes: [`id`, `name`, `gender`, `address`, `phone`, `depositAmount`, `allowedUnit`, `paymentStatus`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return customer ? (await transactions.commit(), res.status(200).json(customer)) : (await transactions.rollback(), res.status(404).json(`Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Update One Customer by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const customer = await customerModel.findOne({ where: { name: req.body.name, phone: req.body.phone }, transaction: transactions });
        return customer ? (await transactions.rollback(), res.status(404).json(`Customer with the same name and phone already exists`)) : (await customerModel.update(req.body, { where: { id: id }, transaction: transactions }), await transactions.commit(), res.status(200).json(customer));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Customer by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const customer = await customerModel.restore({ where: { id: id }, transaction: transactions });
        return customer ? (await transactions.commit(), res.status(200).json(customer)) : (await transactions.rollback(), res.status(404).json(`Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Restore One Customer by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const customer = await customerModel.destroy({ where: { id: id }, transaction: transactions });
        return customer ? (await transactions.commit(), res.status(200).json(customer)) : (await transactions.rollback(), res.status(404).json(`Customer not found`));
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};
