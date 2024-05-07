'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Difficulty extends Model {
        static associate(models) {
            Difficulty.hasMany(models.Package, {
                foreignKey: 'difficulty_level_id',
                as: 'packages'
            });
        }
    }

    Difficulty.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'Difficulty'
    });

    return Difficulty;
};
