type SavingGoalResponse = {
  _id: string;
  name: string;
  householdId: string;
  createdAt: number;
  currentBalance: number;
  description?: string;
  goal: number;
  updatedAt: number;
};
type SavingGoalsResponse = SavingGoalResponse[];

export type { SavingGoalResponse, SavingGoalsResponse };
