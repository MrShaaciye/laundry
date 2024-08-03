`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Supply Model
    const Supplies = sequelize.define(
        `supply`,
        {
            id: {
                type: DataTypes.BIGINT(20).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    is: {
                        args: /^[A-Za-z_' ]+$/i,
                        msg: `Name must be Letters`,
                    },
                    len: {
                        args: [3, 20],
                        msg: `Name must be between 3 and 20 characters.`,
                    },
                    notEmpty: {
                        args: true,
                        msg: `Name is required.`,
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

    return Supplies;
};
