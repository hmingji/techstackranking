import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import { sendScrapCommand } from './batch/sendScrapCommand';
import { getTechStacks } from './controllers/techStackController';
import { getJobs } from './controllers/jobController';

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

app.get('/startscrap', async function (req, res) {
  try {
    const result = await sendScrapCommand();
    res.send(`sent command ${result}`);
  } catch (err) {
    return res.status(500).send('Error');
  }
});

app.get('/techstacks', getTechStacks);

app.get('/jobs', getJobs);
