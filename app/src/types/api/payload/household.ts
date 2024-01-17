type CreateHouseholdPayload = { name: string };
type UpdateHouseholdPayload = { id: string; name?: string; membersIds?: string[] };
export type { CreateHouseholdPayload, UpdateHouseholdPayload };
