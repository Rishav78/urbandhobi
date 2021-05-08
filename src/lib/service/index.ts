import { AddressService } from "./address.service";
import CartService from "./cart.service";
import { ClothService } from "./cloth.service";
import { LaundryService } from "./laundry.service";
import { ServicesService } from "./services.service";

export class Service {
  public cart = () => new CartService();

  public services = () => new ServicesService();

  public laundry = () => new LaundryService();

  public address = () => new AddressService();

  public cloth = () => new ClothService();
}

export default Service;
