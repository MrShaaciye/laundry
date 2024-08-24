`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Delivery Model
    const Deliveries = sequelize.define(
        `delivery`,
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
            fee: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Fee must be a decimal number.`,
                    },
                    len: {
                        args: [1, 5],
                        msg: `Fee must be between 1 and 6 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Fee is required.`,
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

    return Deliveries;
};
