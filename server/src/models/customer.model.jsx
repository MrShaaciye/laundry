`use strict`;
module.exports = (sequelize, DataTypes) => {
  // Define Customer Model
  const Customers = sequelize.define(
    `customer`,
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
      gender: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
          isIn: {
            args: [[`Male`, `Female`]],
            msg: `Gender must be one of the Male or Female.`,
          },
          len: {
            args: [4, 6],
            msg: `Gender must be between 4 and 6 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Gender is required.`,
          },
        },
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9_., ]+$/i,
            msg: `Address must be Letters/Numbers`,
          },
          len: {
            args: [4, 100],
            msg: `Address must be between 4 and 100 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Address is required.`,
          },
        },
      },
      phone: {
        type: DataTypes.STRING(9),
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]+$/i,
            msg: `Phone must be numbers`,
          },
          len: {
            args: [9, 9],
            msg: `Phone must be 9 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Phone is required.`,
          },
        },
      },
      depositAmount: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: `Deposit amount must be a decimal number.`,
          },
          len: {
            args: [1, 8],
            msg: `Deposit amount must be between 1 and 8 characters.`,
          },
          notNull: {
            args: true,
            msg: `Deposit amount is required.`,
          },
        },
      },
      allowedUnit: {
        type: DataTypes.INTEGER(1).UNSIGNED,
        allowNull: false,
        validate: {
          isIn: {
            args: [[`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`]],
            msg: `Allowed Units must be only number 4`,
          },
          isInt: {
            args: true,
            msg: `Allowed Unit must be an integer.`,
          },
          len: {
            args: [1, 1],
            msg: `Allowed Units must be 1 character.`,
          },
          notNull: {
            args: true,
            msg: `Allowed Unit is required.`,
          },
        },
      },
      paymentStatus: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          isIn: {
            args: [[`Full Paid`, `Partial Paid`, `Not Paid`]],
            msg: `Payment status must be one of the Full Paid, Partial Paid or Not Paid.`,
          },
          len: {
            args: [8, 12],
            msg: `Payment status must be between 8 and 12 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Payment status is required.`,
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Customers;
};
