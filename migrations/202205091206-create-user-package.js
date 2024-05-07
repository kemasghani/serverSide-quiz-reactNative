'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserPackages', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            package_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Packages',
                    key: 'id'
                }
            },
            correct_answers: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            incorrect_answers: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            completed_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('UserPackages');
    }
};
