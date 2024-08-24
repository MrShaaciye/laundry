`use strict`;
module.exports = (sequelize, DataTypes) => {
    // Define Service Model
    const Services = sequelize.define(
        `service`,
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
                        args: [7, 20],
                        msg: `Name must be between 7 and 20 characters.`,
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

    return Services;
};
