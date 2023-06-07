import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import * as techStackController from './controllers/techStackController';
import * as jobController from './controllers/jobController';
import * as commandController from './controllers/commandController';
import { publishScraperJob } from './batch/publishScraperJob';

export const app = express();

app.use(express.json());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: 'HTTP',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use(
  cors({
    origin: ['http://localhost:4200'],
  })
);

app.get('/startscrap/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const result = await publishScraperJob(id);
    res.status(200).json({ message: `Job ${result.jobName} published.` });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/techstacks', techStackController.getTechStacks);

app.get('/techstacks/all', techStackController.getAllTechStacks);

app.get('/jobs', jobController.getJobs);

app.get('/jobs/:id', jobController.getJobDetails);

app.get('/commands', commandController.getAllCommands);

app.post('/commands', commandController.createCommand);

app.put('/commands/:id', commandController.updateCommand);

app.delete('/commands/:id', commandController.removeCommand);
