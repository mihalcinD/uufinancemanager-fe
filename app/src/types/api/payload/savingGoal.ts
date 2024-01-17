type CreateSavingGoalPayload = {
  householdId: string;
  name: string;
  description?: string;
  goal: number;
};

export type { CreateSavingGoalPayload };
