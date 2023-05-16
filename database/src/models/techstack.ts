import {
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import Category from './category';
import { sequelize } from './sequelize';
import Keyword from './keyword';
import Job from './job';

class TechStack extends Model<
  InferAttributes<TechStack, { omit: 'category' }>,
  InferCreationAttributes<TechStack, { omit: 'category' }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare count: number;

  declare category?: NonAttribute<Category>;
  declare setCategory: BelongsToSetAssociationMixin<Category, number>;
}

TechStack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'TechStacks',
    timestamps: false,
  }
);

TechStack.hasMany(Keyword);
TechStack.belongsTo(Category, {
  targetKey: 'id',
  foreignKey: 'CategoryId',
  as: 'category',
});
TechStack.belongsToMany(Job, { through: 'JobTechStacks' });

export default TechStack;
