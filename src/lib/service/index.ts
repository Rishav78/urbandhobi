import CartService from "./cart.service";
import { LaundryService } from "./laundry.service";
import { ServicesService } from "./services.service";

export class Service {
  public cart = (cart?: string, item?: string) => {
    return new CartService(cart, item);
  }

  public services = () => new ServicesService();

  public laundry = (cart: string) => new LaundryService(cart);
}

export default Service;
