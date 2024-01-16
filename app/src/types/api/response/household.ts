type HouseholdsResponse = HouseholdResponse[];

type HouseholdResponse = {
  _id: string;
  updatedAt: number;
  createdAt: number;
  balance: number;
  name: string;
  ownerId: string;
  membersIds: string[];
};

type HouseholdStatisticsResponse = { _id: string; y: number }[];

export type { HouseholdsResponse, HouseholdResponse, HouseholdStatisticsResponse };
