`use strict`;
const db = require(`../models/index.jsx`);
const xlsx = require(`xlsx`);

// Import employeeModel, Sequelize, Op
const employeeModel = db.employeeModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Bulk Create Employee
exports.bulkCreate = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const workbook = xlsx.read(req.file.buffer, { type: `buffer` }); // Read the Excel file buffer using xlsx library
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]); // Convert the worksheet to JSON format
        const names = data.map(employee => employee.name); // Get the names of the employees from the data array
        const phones = data.map(employee => employee.phone); // Get the phone numbers of the employees from the data array
        let employees;
        const existingEmployees = await employeeModel.findAll({ where: { [Op.and]: [{ name: { [Op.in]: names } }, { phone: { [Op.in]: phones } }] }, defaults: { gender: req.body.gender, address: req.body.address, jobTitle: req.body.jobTitle, salary: req.body.salary } }); // Find existing employees
        return existingEmployees.length > 0 ? (await transactions.rollback(), res.status(400).json(`Employees with the same name and phone already exist`)) : ((employees = await employeeModel.bulkCreate(data, { transaction: transactions })), (await transactions.commit(), res.status(201).json(employees))); // Create employees using Sequelize bulkCreate method
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err.message);
    }
};

// Create Employee
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [employee, created] = await employeeModel.findOrCreate({ where: { name: req.body.name, phone: req.body.phone }, defaults: { gender: req.body.gender, address: req.body.address, jobTitle: req.body.jobTitle, salary: req.body.salary }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(employee)) : employee ? (await transactions.rollback(), res.status(500).json(`Employee with the same name and phone already exists`)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Find All Employees
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        const gender = req.body.gender;
        const address = req.body.address;
        const phone = req.body.phone;
        const jobTitle = req.body.jobTitle;
        const salary = req.body.salary;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : gender ? { gender: { [Op.like]: `%${gender}%` } } : address ? { address: { [Op.like]: `%${address}%` } } : phone ? { phone: { [Op.like]: `%${phone}%` } } : jobTitle ? { jobTitle: { [Op.like]: `%${jobTitle}%` } } : salary ? { salary: { [Op.like]: `%${salary}%` } } : null;
        const employees = await employeeModel.findAndCountAll({
            attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return employees ? (await transactions.commit(), res.status(200).json(employees)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One Employee by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const employee = await employeeModel.findOne({
            attributes: [`id`, `name`, `gender`, `address`, `phone`, `jobTitle`, `salary`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return employee ? (await transactions.commit(), res.status(200).json(employee)) : await transactions.rollback(), res.status(404).json(`Employee not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One Employee by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let employee;
        const findEmployee = await employeeModel.findOne({ where: { name: req.body.name, phone: req.body.phone }, transaction: transactions });
        return findEmployee ? (await transactions.rollback(), res.status(400).json(`Employee with the same name and phone already exists`)) : ((employee = await employeeModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(employee)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One Employee by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const employee = await employeeModel.restore({ where: { id: id }, transaction: transactions });
        return employee ? (await transactions.commit(), res.status(200).json(employee)) : await transactions.rollback(), res.status(404).json(`Employee not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One Employee by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const employee = await employeeModel.destroy({ where: { id: id }, transaction: transactions });
        return employee ? (await transactions.commit(), res.status(200).json(employee)) : await transactions.rollback(), res.status(404).json(`Employee not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
