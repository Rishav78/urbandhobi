import { Cart } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "../utils";

export class CartService {

  private cartId: string;
  private itemId?: string;

  constructor(cartId: string, itemId?: string) {
    this.cartId = cartId;
    this.itemId = itemId;
  }

  public createCart = async () => {
    const url = api.cart.addItem(this.cartId);
  }

  public getCarts = async () => {
    const url = api.cart.getCart(this.cartId);
    try {
      const {auth} = await getTokens();
      const [cart] = await getFetchWrapper<null, Cart[]>(url, "GET")
        .setTokens(auth)
        .send();
      return cart;
    }
    catch (error) {
      console.log(error);
    }
  }

  public deleteCart = () => {}

  public addItem = () => {}

  public updateItem = () => {}

  public deleteItem = () => {}
}

export default CartService;
