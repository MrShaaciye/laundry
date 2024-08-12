`use strict`;
// Import db, Bcrypt, JSONWebToken, UserModel, Sequelize, Op
const db = require(`../models/index.jsx`);
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);

const userModel = db.userModel;
const sequelize = db.sequelize;
const Op = db.Op;

// Create User
exports.create = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const [user, created] = await userModel.findOrCreate({ where: { username: req.body.username }, defaults: { name: req.body.name, password: req.body.password, type: req.body.type }, transaction: transactions });
        return created ? (await transactions.commit(), res.status(201).json(user)) : err;
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Login User
/* exports.login = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ where: { username: username }, transaction: transactions });
        if (!user) return await transactions.rollback(), res.status(404).json({ err: `Sorry! username ${username}User not found` });
        const match = await bcrypt.compare(password, user.password);
        let accessToken;
        return !match ? (await transactions.rollback(), res.status(401).json({ err: `Sorry! password is incorrect` })) : (await transactions.commit(), (accessToken = jwt.sign({ username: user.username, id: user.id }, "secret", { expiresIn: 60 * 60 })), res.status(200).json({ token: accessToken, username: user.username, type: user.type, id: user.id }));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
}; */

// Auth User
// exports.auth = async (req, res) => await res.json(req.user);

// Find All Users
exports.findAll = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const name = req.body.name;
        const username = req.body.username;
        const type = req.body.type;
        let finder = name ? { name: { [Op.like]: `%${name}%` } } : username ? { username: { [Op.like]: `%${username}%` } } : type ? { type: { [Op.like]: `%${type}%` } } : null;
        const users = await userModel.findAndCountAll({
            attributes: [`id`, `name`, `username`, `password`, `type`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            order: [[`id`, `DESC`]],
            where: finder,
        });
        return users ? (await transactions.commit(), res.status(200).json(users)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Find One User by id
exports.findOne = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const user = await userModel.findOne({
            attributes: [`id`, `name`, `username`, `password`, `type`, `createdAt`, `updatedAt`, `deletedAt`],
            transaction: transactions,
            lock: false,
            paranoid: false,
            where: { id: id },
        });
        return user ? (await transactions.commit(), res.status(200).json(user)) : await transactions.rollback(), res.status(404).json(`User not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Update One User by id
exports.update = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        let user;
        const findUser = await userModel.findOne({ where: { username: req.body.username }, transaction: transactions });
        return findUser ? (await transactions.rollback(), res.status(400).json(`User with the same username already exists`)) : ((user = await userModel.update(req.body, { where: { id: id }, transaction: transactions })), (await transactions.commit(), res.status(200).json(user)));
    } catch (err) {
        const messages = {};
        let message;
        return await transactions.rollback(), err.errors.forEach(error => ((messages[error.path] = error.message), (message = messages[error.path]))), res.status(500).json(message);
    }
};

// Restore One User by id
exports.restore = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const user = await userModel.restore({ where: { id: id }, transaction: transactions });
        return user ? (await transactions.commit(), res.status(200).json(user)) : await transactions.rollback(), res.status(404).json(`User not found`);
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};

// Delete One User by id
exports.delete = async (req, res) => {
    const transactions = await sequelize.transaction();
    try {
        const id = req.params.id;
        const user = await userModel.destroy({ where: { id: id }, transaction: transactions });
        return user ? (await transactions.commit(), res.status(200).json(user)) : await transactions.rollback(), res.status(404).json(`User not found`);
        return user ? (await transactions.commit(), res.status(200).json(user)) : err;
    } catch (err) {
        return await transactions.rollback(), res.status(500).json(err);
    }
};
