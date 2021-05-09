export interface Request {
  id: string;
  userId: string;
  cartId: string;
  timingId: number;
  paymentMethod: "cod";
  addressId: string;
  pickupDate: string;
  canceled: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
