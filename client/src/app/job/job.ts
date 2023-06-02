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

export type JobSort = 'created' | 'techstack' | undefined;
export type JobOrder = 'desc' | 'asc' | undefined;
export type JobPageSize = 15 | 25 | 50;
export const PAGE_SIZES = [15, 25, 50];
