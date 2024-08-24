`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Order Model
    const Orders = sequelize.define(
        `order`,
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            bringDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        args: true,
                        msg: `Bring Date must be a valid date.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Bring Date is required.`,
                    },
                },
            },
            collectDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        args: true,
                        msg: `Collect Date must be a valid date.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Collect Date is required.`,
                    },
                },
            },
            customerId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Customer ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Customer ID is required.`,
                    },
                },
            },
            employeeId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Employee ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Employee ID is required.`,
                    },
                },
            },
            serviceId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Service ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Service ID is required.`,
                    },
                },
            },
            itemId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Item ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Item ID is required.`,
                    },
                },
            },
            priceId: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                validate: {
                    isInt: {
                        args: true,
                        msg: `Price ID must be an integer.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Price ID is required.`,
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
            pickupFee: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Pick up fee must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Pick up fee must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Pick up fee is required.`,
                    },
                },
            },
            totalAmount: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Total Amount must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Total Amount must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Total Amount is required.`,
                    },
                },
            },
            paidAmount: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Paid Amount must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Paid Amount must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Paid Amount is required.`,
                    },
                },
            },
            balance: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Balance must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Balance must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Balance is required.`,
                    },
                },
            },
            paymentType: {
                type: DataTypes.STRING(8),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [[`EVC Plus`, `Cash`]],
                        msg: `Payment type must be one of the EVC Plus or Cash.`,
                    },
                    len: {
                        args: [4, 8],
                        msg: `Payment type must be between 4 and 8 characters.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Payment type is required.`,
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

    return Orders;
};
