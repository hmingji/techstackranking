import { Job } from '../models';
import { sequelize } from '../models/sequelize';

export async function removeDuplicateJob() {
  const results = await sequelize.query(
    `SELECT DISTINCT
      R1.id AS id,
      R1.position AS position,
      R1.company AS company,
      R1."expYear" AS "expYear",
      R1."entryLevel" AS "entryLevel",
      R1."createdAt" AS "createdAt",
      R1."updatedAt" AS "updatedAt"
      FROM public."Jobs" R1 
      JOIN public."Jobs" R2 ON R1.position = R2.position 
      AND R1.company = R2.company 
      AND R1.ID > R2.ID
    `,
    { mapToModel: true, model: Job }
  );
  for (const result of results) {
    const teckstacks = await result.getTechStacks();
    await result.removeTechStacks(teckstacks);
  }
  for (const result of results) {
    await result.destroy();
  }

  console.log('duplicates removed');
}
