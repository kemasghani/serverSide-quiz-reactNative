'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserPackage extends Model {
        static associate(models) {
            UserPackage.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            });
            UserPackage.belongsTo(models.Package, {
                foreignKey: 'package_id',
                as: 'package'
            });
            UserPackage.hasMany(models.UserQuestion, {
                foreignKey: 'user_package_id',
                as: 'userQuestions'
            });
        }
    }

    UserPackage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        package_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        correct_answers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        incorrect_answers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'UserPackage'
    });

    return UserPackage;
};
