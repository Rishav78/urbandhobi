import { RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const useCloth = () => {
  const dispatch = useDispatch();
  const cloths = useSelector(clothSelector, shallowEqual);

  const getCloths = useCallback(async () => {
    const service = new Service().cloth();
    const res = await service.get();
    if (res) {
      dispatch(setSupportedLaundry(res));
    }
  }, []);

  return {
    getCloths,
    cloths,
  };
};

