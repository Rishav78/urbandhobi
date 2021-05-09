export interface Request {
  id: string;
  userId: string;
  cartId: string;
  timingId: number;
  paymentMethod: "cod";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
