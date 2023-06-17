//this function is created to initialize data in techstackCount column
//(which is added to Jobs table for query sorting purpose)
// import dotenv from 'dotenv';
// dotenv.config();
import { Job } from '../models';

async function fillTechStackCountData() {
  const jobs = await Job.findAll();
  for (const job of jobs) {
    const count = await job.countTechStacks();
    job.set('techstackCount', count);
    await job.save();
  }
}

//fillTechStackCountData();
