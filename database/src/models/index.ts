// export * from './job';
// export * from './keyword';
// export * from './techstack';
// export * from './category';
import Job from './job';
import Keyword from './keyword';
import TechStack from './techstack';
import Category from './category';

//create association
Category.hasMany(TechStack, { foreignKey: 'CategoryId', as: 'category' });
TechStack.belongsTo(Category, {
  targetKey: 'id',
  foreignKey: 'CategoryId',
  as: 'category',
});

Job.belongsToMany(TechStack, { through: 'JobTechStacks' });
TechStack.belongsToMany(Job, { through: 'JobTechStacks' });

Keyword.belongsTo(TechStack);
TechStack.hasMany(Keyword);

export { Job, Keyword, Category, TechStack };
