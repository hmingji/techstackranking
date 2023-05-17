import {
  BelongsToGetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from './sequelize';
import TechStack from './techstack';

class Keyword extends Model<
  InferAttributes<Keyword, { omit: 'techstack' }>,
  InferCreationAttributes<Keyword, { omit: 'techstack' }>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare techstack?: NonAttribute<TechStack>;
  declare getTechStack: BelongsToGetAssociationMixin<TechStack>;
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
    tableName: 'Keywords',
    timestamps: false,
  }
);

//Keyword.belongsTo(TechStack);

export default Keyword;
