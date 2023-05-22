//support different sorting and filtering
//filter by createdAt(before/after one single date), entrylevel(true/false), tech stack(array of ts id)
//sort by tsCount, createdAt
import {
  InferAttributes,
  Job,
  Op,
  TechStack,
  WhereOptions,
  sequelize,
} from '@techstack-ranking/database';
import { Request, Response, urlencoded } from 'express';

//order by number of tech stack matched, createdAt
export async function getJobs(req: Request, res: Response) {
  //filter
  //const filterRecord: Record<'createdAt'|'entryLevel'|'techstacks', string> = {}
  //building where object incrementally by checking if query string exist
  let whereOption: WhereOptions<InferAttributes<Job, { omit: 'TechStacks' }>> =
    {};
  if (req.query.createdAt) {
    const query = JSON.parse(req.query.createdAt as string);
    whereOption = {
      ...whereOption,
      createdAt: {
        [query[0] === 'gte' ? Op.gte : Op.lte]: new Date(Date.parse(query[1])),
      },
    };
  }
  //array could be repeated value foo=1&foo=2
  console.log(encodeURI("['gte', ]"));
  console.log(req.query.createdAt);
  //const result = await Job.findAll({ where: whereOption });
  //res.status(200).json(result);
  //   const result = await Job.findAll({
  //     attributes: [
  //       'id',
  //       [sequelize.literal('COUNT(*) OVER(PARTITION BY "Job".id)'), 'tsCount'],
  //     ],
  //     include: [{ model: TechStack }],
  //     where: { '$TechStacks.name$': { [Op.in]: ['React', 'Webpack'] } },
  //     order: [['tsCount', 'DESC']],
  //   });
  //   const jobIds = result.map((p) => p.id);
  //   const jobIdsSliced = jobIds.slice(0, 15);
  //   const final = await Job.findAll({
  //     where: { id: { [Op.in]: jobIdsSliced } },
  //     include: [{ model: TechStack }],
  //   });
  //   const finalSorted = jobIdsSliced.map((id) => final.find((p) => p.id === id));
  //   if (!result) res.status(404).json({ error: 'Not Found' });
  res.status(200).json();
}

export async function getJobDetails() {
  return;
}
