import { TechStack } from '../models';

export async function computeTechStackCount() {
  const techstacks = await TechStack.findAll();
  for (const techstack of techstacks) {
    const count = await techstack.countJobs();
    techstack.set('count', count);
    await techstack.save();
  }
}
