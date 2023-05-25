import { TechStack } from '@techstack-ranking/database';
import { Request, Response } from 'express';

//TODO: add filter by category
export async function getTechStacks(req: Request, res: Response) {
  try {
    //get query string available and set default value
    console.log(req.query.limit);
    const sort = (req.query.sort as string) ?? 'count';
    const order = (req.query.order as string) ?? 'desc';
    const limit = parseInt((req.query.limit as string) ?? '15');
    const offset = parseInt((req.query.offset as string) ?? '0');

    //validate query string
    if (
      !['count', 'name'].includes(sort.toLowerCase()) ||
      !['desc', 'asc'].includes(order.toLowerCase())
    ) {
      res.status(400).json({ message: 'Invalid query string' });
      return;
    }

    const result = await TechStack.findAndCountAll({
      attributes: ['id', 'name', 'count'],
      order: [[sort, order]],
      limit,
      offset,
    });

    if (!result) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
