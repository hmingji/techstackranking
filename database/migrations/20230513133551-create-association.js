'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('TechStacks', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('Keywords', 'TechStackId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'TechStacks',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.createTable('JobTechStacks', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      JobId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      TechStackId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('TechStacks', 'CategoryId');
    await queryInterface.removeColumn('Keywords', 'TechStackId');
    await queryInterface.dropTable('JobTechStacks');
  },
};
