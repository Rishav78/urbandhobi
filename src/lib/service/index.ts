import CartService from "./cart.service";

export class Service {
  public cart = () => {
    return new CartService();
  }
}

export default Service;
