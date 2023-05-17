import { sequelize } from '../models/sequelize';

export async function removeDuplicateJob() {
  const res = await sequelize.query(
    'DELETE FROM public."Jobs" R1 USING public."Jobs" R2 WHERE R1.id > R2.id AND R1.position = R2.position AND R1.company = R2.company'
  );

  console.log('duplicates removed');
}
