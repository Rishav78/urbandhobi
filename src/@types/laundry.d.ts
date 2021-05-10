export interface Request {
  id: string;
  userId: string;
  cartId: string;
  timingId: number;
  paymentMethod: "cod";
  addressId: string;
  pickupDate: string;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
