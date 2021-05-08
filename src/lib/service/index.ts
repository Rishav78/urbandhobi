import { AddressService } from "./address.service";
import CartService from "./cart.service";
import { LaundryService } from "./laundry.service";
import { ServicesService } from "./services.service";

export class Service {
  public cart = () => new CartService();

  public services = () => new ServicesService();

  public laundry = () => new LaundryService();

  public address = () => new AddressService();
}

export default Service;
