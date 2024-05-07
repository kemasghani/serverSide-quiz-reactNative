'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Questions', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false
            },
            option1: {
                type: Sequelize.STRING,
                allowNull: false
            },
            option2: {
                type: Sequelize.STRING,
                allowNull: false
            },
            option3: {
                type: Sequelize.STRING,
                allowNull: false
            },
            option4: {
                type: Sequelize.STRING,
                allowNull: false
            },
            option5: {
                type: Sequelize.STRING,
                allowNull: false
            },
            correctOption: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            package_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Packages',
                    key: 'id'
                }
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
        await queryInterface.dropTable('Questions');
    }
};
