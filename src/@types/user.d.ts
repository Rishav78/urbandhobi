export interface User {
  id: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
  number: string;
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
