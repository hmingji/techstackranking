export interface Command {
  id?: string;
  name: string;
  command: string;
}

export interface CommandResponse {
  data: Command[];
  lastEvaluationKey: string | null;
}
