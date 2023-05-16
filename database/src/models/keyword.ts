import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from './sequelize';
import TechStack from './techstack';

class Keyword extends Model<
  InferAttributes<Keyword>,
  InferCreationAttributes<Keyword>
> {
  declare id: CreationOptional<number>;
  declare value: string;
}

Keyword.init(
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
    tableName: 'TechStacks',
    timestamps: false,
  }
);

Keyword.belongsTo(TechStack);

export default Keyword;
