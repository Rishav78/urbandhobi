import CartService from "./cart.service";
import { ServicesService } from "./services.service";

export class Service {
  public cart = (cart?: string, item?: string) => {
    return new CartService(cart, item);
  }

  public services = () => new ServicesService();
}

export default Service;
