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
  BelongsToManyCountAssociationsMixin,
} from 'sequelize';
import TechStack from './techstack';
import { sequelize } from './sequelize';

class Job extends Model<
  InferAttributes<Job, { omit: 'TechStacks' }>,
  InferCreationAttributes<Job, { omit: 'TechStacks' }>
> {
  declare id: CreationOptional<number>;
  declare position: string;
  declare company: string;
  declare description: string;
  declare expYear: CreationOptional<number>;
  declare entryLevel: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare techstackCount: CreationOptional<number>;

  declare TechStacks?: NonAttribute<TechStack[]>;
  declare getTechStacks: HasManyGetAssociationsMixin<TechStack>;
  declare addTechStacks: HasManyAddAssociationsMixin<TechStack, number>;
  declare removeTechStacks: HasManyRemoveAssociationsMixin<TechStack, number>;
  declare addTechStack: HasManyAddAssociationMixin<TechStack, number>;
  declare removeTechStack: HasManyRemoveAssociationMixin<TechStack, number>;
  declare countTechStacks: BelongsToManyCountAssociationsMixin;
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
    techstackCount: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'Jobs',
  }
);

//Job.belongsToMany(TechStack, { through: 'JobTechStacks' });

export default Job;
