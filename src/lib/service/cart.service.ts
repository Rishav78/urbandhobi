import { AddItemBody, Cart, CartItemGBService } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper } from "@urbandhobi/lib/utils";

export class CartService {

  constructor(
    private _cart?: string,
    private _item?: string
  ) { }

  public cart = (cart: string) => {
    this._cart = cart;
    return this;
  }

  public item = (item: string) => {
    this._item = item;
    return this;
  }

  public createCart = async () => {
    // const url = api.cart.addItem(this.cartId);
  }

  public getCart = async () => {
    const url = api.cart.getCart() + "?items=false";
    try {
      const {auth} = await getTokens();
      const res = await getFetchWrapper<null, Cart[]>()
        .setURL(url)
        .setTokens(auth)
        .setReqMethod("GET")
        .send();
      return res[0];
    }
    catch (error) {
      console.error(error);
    }
  }

  public getItems = async () => {
    try {
      if (!this._cart) {
        throw new Error("cart id not provided");
      }
      const url = api.cart.cartItems(this._cart) + "?groupby=service";
      const {auth} = await getTokens();
      const res = await getFetchWrapper<null, CartItemGBService[]>()
        .setURL(url)
        .setReqMethod("GET")
        .setTokens(auth)
        .send();
      const sections = res.filter(e => e.items.length > 0);
      return sections;
    }
    catch (error) {
      console.log(error);
    }
  }

  // public getCart = async (): Promise<{
  //   items: GenericObject<CartItem[]>;
  //   cart: Cart;
  // } | undefined> => {
  //   const url = api.cart.getCart(this._cart);
  //   try {
  //     const { auth } = await getTokens();
  //     const res = await getFetchWrapper<null, CartNItems[]>(url, "GET")
  //       .setTokens(auth)
  //       .send();
  //     if (res) {
  //       const { items, ...cart } = res[0];
  //       const mapItems = await Iterator.group(items, item => item.cleanType);
  //       return { items: mapItems, cart };
  //     }
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  public deleteCart = () => { }

  public addItem = async (data: AddItemBody[]) => {
    const url = api.cart.addItem(this._cart!);
    try {
      const { auth } = await getTokens();
      await getFetchWrapper(url, "PUT")
        .setTokens(auth)
        .setData(data)
        .send();
      return true;
    }
    catch (error) {
      console.error(error);
      return false;
    }
  }

  public updateItem = () => { }

  public deleteItem = () => { }
}

export default CartService;
