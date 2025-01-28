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
    return created ? (await transactions.commit(), res.status(201).json(user)) : (await transactions.rollback(), res.status(409).json({ err: `Sorry! username ${req.body.username} already exists` }));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Login User
exports.login = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ where: { username: username }, transaction: transactions });
    if (!user) return await transactions.rollback(), res.status(200).json({ err: `Sorry! username doesn't exist` });
    const match = await bcrypt.compare(password, user.password);
    let accessToken;
    return match ? (await transactions.commit(), (accessToken = jwt.sign({ id: user.id, name: user.name, username: user.username, type: user.type }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })), res.status(200).json({ token: accessToken, id: user.id, name: user.name, username: user.username, type: user.type })) : (await transactions.rollback(), res.status(200).json({ err: `Sorry! Password is incorrect` }));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Auth User
exports.auth = async (req, res) => {
  return await res.json(req.user);
};

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
    return await transactions.commit(), res.status(200).json(users);
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
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
    return user ? (await transactions.commit(), res.status(200).json(user)) : (await transactions.rollback(), res.status(404).json(`User not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Update One User by id
exports.update = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const user = await userModel.findOne({ where: { username: req.body.username }, transaction: transactions });
    return user ? (await transactions.rollback(), res.status(409).json(`User with the same username already exists`)) : (await userModel.update(req.body, { where: { id: id }, transaction: transactions }), (await transactions.commit(), res.status(200).json(user)));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Restore One User by id
exports.restore = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const user = await userModel.restore({ where: { id: id }, transaction: transactions });
    return user ? (await transactions.commit(), res.status(200).json(user)) : (await transactions.rollback(), res.status(404).json(`User not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};

// Delete One User by id
exports.delete = async (req, res) => {
  const transactions = await sequelize.transaction();
  try {
    const id = req.params.id;
    const user = await userModel.destroy({ where: { id: id }, transaction: transactions });
    return user ? (await transactions.commit(), res.status(200).json(user)) : (await transactions.rollback(), res.status(404).json(`User not found`));
  } catch (err) {
    return await transactions.rollback(), res.status(500).json(err.message);
  }
};
