import { Request, Response } from 'express';
import * as commandRepository from '../repositories/commmandRepository';
import { v4 as uuidv4 } from 'uuid';

async function getAllCommands(req: Request, res: Response) {
  try {
    const limit = parseInt((req.query.limit as string) ?? '20');
    const exclusiveStartKey = req.query.exclusiveStartKey as string;

    if (isNaN(limit)) {
      res.status(400).json({ error: 'Invalid query parameter' });
      return;
    }

    const result = await commandRepository.getAllCommands(
      limit,
      exclusiveStartKey
    );

    if (!result) {
      res.status(404).json({ error: 'Not found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createCommand(req: Request, res: Response) {
  try {
    const { name, command } = req.body;
    if (!name || !command) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }
    const result = await commandRepository.createCommand({
      id: uuidv4(),
      name,
      command,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeCommand(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await commandRepository.removeCommand(id);
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCommand(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { name, command } = req.body;
    if (!id || !name || !command) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }

    const result = await commandRepository.updateCommand({ id, name, command });
    res.status(200).json({ id, name, command });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export { getAllCommands, createCommand, removeCommand, updateCommand };
