import { AddItemBody, Cart, CartItem } from "@urbandhobi/@types";
import { api } from "../config";
import { getTokens } from "../helpers";
import { getFetchWrapper, Iterator } from "@urbandhobi/lib/utils";

export class CartService {

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

  public deleteCart = () => { }

  public addItem = async (data: AddItemBody[]) => {
    const url = api.cart.addItem();
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
