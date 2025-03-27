`use strict`;
module.exports = (sequelize, DataTypes) => {
  // Define Inventory Model
  const Inventories = sequelize.define(
    `inventory`,
    {
      id: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      supplyId: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: `Supply ID must be an integer.`,
          },
          notEmpty: {
            args: true,
            msg: `Supply ID is required.`,
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER(6).UNSIGNED,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: `Quantity must be an integer.`,
          },
          len: {
            args: [1, 6],
            msg: `Quantity must be between 1 and 6 characters.`,
          },
          notNull: {
            args: true,
            msg: `Quantity is required.`,
          },
        },
      },
      type: {
        type: DataTypes.STRING(9),
        allowNull: false,
        validate: {
          isIn: {
            args: [[`Stoke in`, `Stoke out`]],
            msg: `Type must be one of the Stoke in or Stoke out.`,
          },
          len: {
            args: [8, 9],
            msg: `Type must be between 4 and 6 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Type is required.`,
          },
        },
      },
      note: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9_.,'!@#$%^&* ]+$/i,
            msg: `Note must be Letters/Numbers/Some Symbols.`,
          },
          len: {
            args: [3, 50],
            msg: `Note must be between 3 and 50 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Note is required.`,
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Inventories;
};
