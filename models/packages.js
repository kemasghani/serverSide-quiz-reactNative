'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        static associate(models) {
            Package.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'category'
            });
            Package.belongsTo(models.Difficulty, {
                foreignKey: 'difficulty_level_id',
                as: 'difficulty'
            });
            Package.hasMany(models.Question, {
                foreignKey: 'package_id',
                as: 'questions'
            });
        }
    }

    Package.init({
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        difficulty_level_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Package'
    });

    return Package;
};
