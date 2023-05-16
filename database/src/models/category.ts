import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from './sequelize';
import TechStack from './techstack';

class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare value: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'Categories',
    timestamps: false,
  }
);

Category.hasMany(TechStack, { foreignKey: 'CategoryId', as: 'category' });

export default Category;
