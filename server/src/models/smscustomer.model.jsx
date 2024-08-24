`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define SMS Customer Model
    const SMSCustomers = sequelize.define(
        `smscustomer`,
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
            body: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                validate: {
                    is: {
                        args: /^[A-Za-z0-9_.,'!@#$%^&* ]+$/i,
                        msg: `Message Body must be Letters/Numbers/Some Symbols.`,
                    },
                    len: {
                        args: [3, 1000],
                        msg: `Message Body must be between 0 and 255 characters.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Message Body is required.`,
                    },
                },
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return SMSCustomers;
};
