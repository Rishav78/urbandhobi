import { AddItemBody, Cart, CartItem, CartItemGBService } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper, Iterator } from "@urbandhobi/lib/utils";

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
      const res = await getFetchWrapper<null, Cart>()
        .setURL(url)
        .setTokens(auth)
        .setReqMethod("GET")
        .send();
      return res;
    }
    catch (error) {
      console.error(error);
    }
  }

  public getItems = async () => {
    try {
      const url = api.cart.cartItems();
      const {auth} = await getTokens();
      const res = await getFetchWrapper<null, CartItem[]>()
        .setURL(url)
        .setReqMethod("GET")
        .setTokens(auth)
        .send();
      const grouped = await Iterator.group(res, item => item.serviceId);
      return grouped;
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
      const res = await getFetchWrapper<AddItemBody[], boolean>(url, "PUT")
        .setTokens(auth)
        .setData(data)
        .send();
      return res;
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
