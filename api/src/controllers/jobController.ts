import {
  InferAttributes,
  Job,
  Op,
  TechStack,
  WhereOptions,
  sequelize,
} from '@techstack-ranking/database';
import { Request, Response } from 'express';

//TODO: add validation on query parameter
//at frontend add error component, display error component based on response
//order by number of tech stack matched, createdAt
export async function getJobs(req: Request, res: Response) {
  try {
    //pagination
    const limit = parseInt((req.query.limit as string) ?? '15');
    const offset = parseInt((req.query.offset as string) ?? '0');

    let sort = (req.query.sort as string) ?? 'created';
    const order = (req.query.order as string) ?? 'desc';

    //validate sort and order
    if (
      !['created', 'techstack'].includes(sort.toLowerCase()) ||
      !['desc', 'asc'].includes(order.toLowerCase())
    ) {
      res.status(400).json({ message: 'Invalid query string' });
      return;
    }
    sort = sort === 'created' ? 'createdAt' : 'tsCount';

    //filtering
    let whereOption: WhereOptions<
      InferAttributes<Job, { omit: 'TechStacks' }>
    > = {};
    if (req.query.created) {
      const queryVal = (req.query.created as string).split(',');
      whereOption['createdAt'] = {
        [queryVal[0] === 'gte' ? Op.gte : Op.lte]: new Date(
          Date.parse(queryVal[1])
        ),
      };
    }
    if (req.query.entry) {
      const queryVal = req.query.entry === 'true';
      whereOption['entryLevel'] = { [Op.eq]: queryVal };
    }
    if (req.query.company) {
      const queryVal = '%' + (req.query.company as string) + '%';
      whereOption['company'] = { [Op.iLike]: queryVal };
    }
    if (req.query.techstacks) {
      const queryVal = (req.query.techstacks as string).split(',');
      const uniqueQueryVal = [...new Set(queryVal)];
      whereOption['$TechStacks.id$'] = { [Op.in]: uniqueQueryVal };
    }

    let total: number;
    const jobsMatched = await Job.findAll({
      attributes: [
        'id',
        [sequelize.literal('COUNT(*) OVER(PARTITION BY "Job".id)'), 'tsCount'],
      ],
      include: [{ model: TechStack }],
      where: whereOption,
      order: [[sort, order]],
    });
    total = jobsMatched.length;

    const jobIds = jobsMatched.map((p) => p.id);
    const jobIdsPaged = jobIds.slice(offset + 1, offset + limit + 1);

    const jobsPaged = await Job.findAll({
      attributes: ['id', 'position', 'company', 'entryLevel', 'createdAt'],
      where: { id: { [Op.in]: jobIdsPaged } },
      include: [
        {
          model: TechStack,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
    const jobsPagedSorted = jobIdsPaged.map((id) =>
      jobsPaged.find((p) => p.id === id)
    );

    const result = { rows: jobsPagedSorted, count: total };
    if (!result) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('error occured: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getJobDetails(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }

    const job = await Job.findOne({
      attributes: [
        'id',
        'position',
        'company',
        'entryLevel',
        'createdAt',
        'description',
      ],
      where: { id: { [Op.eq]: id } },
      include: [
        {
          model: TechStack,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
    if (!job) {
      res.status(404).json({ error: 'Not Found' });
      return;
    }
    res.status(200).json({ data: job });
  } catch (err) {
    console.error('error occured: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
