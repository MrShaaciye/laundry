`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Item Model
    const Items = sequelize.define(
        `item`,
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
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return Items;
};
