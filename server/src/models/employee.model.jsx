`use strict`;
module.exports = (sequelize, DataTypes) => {
  // Define Employee Model
  const Employees = sequelize.define(
    `employee`,
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
            msg: `Gender must be Male or Female.`,
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
            args: [5, 100],
            msg: `Address must be between 5 and 100 characters.`,
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
      jobTitle: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]+$/i,
            msg: `Job Title must be letters.`,
          },
          len: {
            args: [5, 20],
            msg: `Job Title must be between 8 and 12 characters.`,
          },
          notEmpty: {
            args: true,
            msg: `Job Title is required.`,
          },
        },
      },
      salary: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: `Salary must be a decimal number.`,
          },
          len: {
            args: [3, 8],
            msg: `Salary must be between 3 and 8 characters.`,
          },
          notNull: {
            args: true,
            msg: `Salary is required.`,
          },
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Employees;
};
