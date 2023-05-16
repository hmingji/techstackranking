'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechStack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TechStack.belongsToMany(models.Job, { through: 'JobTechStacks' });
      TechStack.hasMany(models.Keyword);
      TechStack.belongsTo(models.Category, {
        foreignKey: 'CategoryId',
        as: 'category',
      });
      models.Category.hasMany(TechStack, {
        foreignKey: 'CategoryId',
        as: 'category',
      });
    }
  }
  TechStack.init(
    {
      name: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TechStack',
      timestamps: false,
    }
  );
  return TechStack;
};
