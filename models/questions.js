'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        static associate(models) {
            Question.belongsTo(models.Package, {
                foreignKey: 'package_id',
                as: 'package'
            });
        }
    }

    Question.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option5: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correctOption: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Question'
    });

    return Question;
};
