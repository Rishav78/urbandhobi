import CartService from "./cart.service";
import { ServicesService } from "./services.service";

export class Service {
  public cart = () => {
    return new CartService();
  }

  public services = () => new ServicesService();
}

export default Service;
