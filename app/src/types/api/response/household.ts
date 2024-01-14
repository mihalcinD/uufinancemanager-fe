type HouseholdsResponse = HouseholdResponse[];

type HouseholdResponse = {
  _id: string;
  updatedAt: number;
  createdAt: number;
  balance: number;
  name: string;
  ownerId: string;
  membersIds: string[];
  expenses: number;
  incomes: number;
};

export type { HouseholdsResponse, HouseholdResponse };
