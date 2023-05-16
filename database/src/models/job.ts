import {
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  DataTypes,
} from 'sequelize';
import TechStack from './techstack';
import { sequelize } from './sequelize';

class Job extends Model<
  InferAttributes<Job, { omit: 'techstacks' }>,
  InferCreationAttributes<Job, { omit: 'techstacks' }>
> {
  declare id: CreationOptional<number>;
  declare position: string;
  declare company: string;
  declare description: string;
  declare expYear: CreationOptional<number>;
  declare entryLevel: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare techstacks?: NonAttribute<TechStack[]>;
  declare getTechStacks: HasManyGetAssociationsMixin<TechStack>;
  declare addTechStacks: HasManyAddAssociationsMixin<TechStack, number>;
  declare removeTechStacks: HasManyRemoveAssociationsMixin<TechStack, number>;
  declare addTechStack: HasManyAddAssociationMixin<TechStack, number>;
  declare removeTechStack: HasManyRemoveAssociationMixin<TechStack, number>;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    position: DataTypes.STRING,
    company: DataTypes.STRING,
    description: DataTypes.STRING,
    expYear: DataTypes.INTEGER,
    entryLevel: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'Jobs',
  }
);

Job.belongsToMany(TechStack, { through: 'JobTechStacks' });

export default Job;
