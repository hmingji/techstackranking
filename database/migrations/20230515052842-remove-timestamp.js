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
    await queryInterface.removeColumn('Keywords', 'createdAt');
    await queryInterface.removeColumn('Keywords', 'updatedAt');
    await queryInterface.removeColumn('TechStacks', 'createdAt');
    await queryInterface.removeColumn('TechStacks', 'updatedAt');
    await queryInterface.removeColumn('Categories', 'createdAt');
    await queryInterface.removeColumn('Categories', 'updatedAt');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Keywords', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Keywords', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('TechStacks', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('TechStacks', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Categories', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Categories', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
