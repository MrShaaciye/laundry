`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Payment Model
    const Payments = sequelize.define(
        `payment`,
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            expenseId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Expense ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Expense ID is required.`,
                    },
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        args: true,
                        msg: `Payment Date must be a valid date.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Payment Date is required.`,
                    },
                },
            },
            amount: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Amount must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Amount must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Amount is required.`,
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
                        msg: `Note must be between 0 and 255 characters.`,
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

    return Payments;
};
