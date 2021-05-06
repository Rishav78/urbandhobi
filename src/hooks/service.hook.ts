import Service from "@urbandhobi/lib/service";
import { setServices } from "@urbandhobi/redux/home/home.action";
import { useDispatch } from "react-redux";

export const useService = () => {
  const dispatch = useDispatch();
  return {
    async getAndSetService() {
      const services = await new Service().services().getServices();
      if (services) {
        dispatch(setServices(services));
      }
    },
  };
};
