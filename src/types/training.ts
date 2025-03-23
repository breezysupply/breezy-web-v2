export type TrainingEntry = {
  content: string;
  tags: string[];
  daysAgo: number;
  createdAt: string;
  stats?: {
    label: string;
    value: string;
  }[];
}; 