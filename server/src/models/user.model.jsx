`use strict`;
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require(`bcrypt`);

  // Define User Model
  const Users = sequelize.define(
    `user`,
    {
      id: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z ]+$/i,
            msg: `Name must be Letters`,
          },
          len: {
            args: [3, 50],
            msg: `Name must be between 3 and 50 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Name is required.`,
          },
        },
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9_.]+$/i,
            msg: `Username must be Letters or mixed Letters/Numbers/Underscore/Dot`,
          },
          len: {
            args: [3, 20],
            msg: `Username must be between 3 and 50 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Username is required.`,
          },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$])/,
            msg: `Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`,
          },
          len: {
            args: [6, 64],
            msg: `Password must be between 6 and 64 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Password is required.`,
          },
        },
      },
      type: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
          isIn: {
            args: [[`admin`, `manager`, `user`]],
            msg: `Type must be admin or manager or user`,
          },
          len: {
            args: [4, 7],
            msg: `Type must be between 4 and 7 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Type is required.`,
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  // Validations
  Users.afterValidate(async (user, options) => {
    user.username = await user.username.toLowerCase();
    user.password = await bcrypt.hash(user.password, 8);
  });

  return Users;
};
