'use strict';
const categorySeed = require('../seeds/category-seed-data.json');
const keywordSeed = require('../seeds/keyword-seed-data.json');
const techStackSeed = require('../seeds/techstack-seed-data.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('Categories', categorySeed, {});
    await queryInterface.bulkInsert('TechStacks', techStackSeed, {});
    await queryInterface.bulkInsert('Keywords', keywordSeed, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('TechStacks', null, {});
    await queryInterface.bulkDelete('Keywords', null, {});
  },
};
