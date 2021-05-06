import { getSupportedLaundry } from "@urbandhobi/actions";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import { useDispatch } from "react-redux";

export const useCloth = () => {
  const dispatch = useDispatch();

  return {
    async fetchAndSetCloth() {
      const cloths = await getSupportedLaundry();
      if (cloths) {
        dispatch(setSupportedLaundry(cloths));
      }
    },
  };
};

