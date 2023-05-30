import { TechStack } from '../rank/techstack';

export interface Job {
  id: number;
  position: string;
  company: string;
  TechStacks: Omit<TechStack, 'count'>[];
  entryLevel: boolean;
  createdAt: string;
}

export interface JobDetail extends Job {
  description: string;
}

export interface JobDetailResponse {
  data: JobDetail;
}

export interface JobResponse {
  rows: Job[];
  count: number;
}

export interface AllTechStacksResponse {
  rows: TechStackNameAndId[];
  count: number;
}

export interface TechStackNameAndId {
  id: number;
  name: string;
}

export interface TechStackFilter extends TechStackNameAndId {
  selection: boolean;
}
