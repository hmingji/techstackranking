export interface Command {
  id: string;
  name: string;
  command: string;
}

export interface PaginatedCommands {
  data: Command[];
  lastEvaluationKey: string | null;
}
