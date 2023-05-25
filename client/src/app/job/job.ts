import { TechStack } from '../rank/techstack';

export interface Job {
  id: number;
  position: string;
  company: string;
  techstacks: Omit<TechStack, 'count'>[];
  entryLevel: boolean;
  createdAt: string;
}

export interface JobDetail extends Job {
  description: string;
}

export interface JobResponse {
  rows: Job[];
  count: number;
}
