'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.TechStack, { through: 'JobTechStacks' });
    }
  }
  Job.init(
    {
      position: DataTypes.STRING,
      company: DataTypes.STRING,
      description: DataTypes.STRING,
      expYear: DataTypes.INTEGER,
      entryLevel: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Job',
    }
  );
  return Job;
};
