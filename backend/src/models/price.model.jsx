`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Price Model
    const Prices = sequelize.define(
        `price`,
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.STRING(3),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [[`Kg`, `Qty`]],
                        msg: `Type must be one of the Kg or Qty.`,
                    },
                    len: {
                        args: [2, 3],
                        msg: `Type must be between 2 and 3 characters.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Type is required.`,
                    },
                },
            },
            cost: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        args: true,
                        msg: `Cost must be a decimal number.`,
                    },
                    len: {
                        args: [1, 8],
                        msg: `Cost must be between 1 and 8 characters.`,
                    },
                    notNull: {
                        args: true,
                        msg: `Cost is required.`,
                    },
                },
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return Prices;
};
