export interface TechStack {
  id: number;
  name: string;
  count: number;
}

export interface TechStackResponse {
  rows: TechStack[];
  count: number;
}
