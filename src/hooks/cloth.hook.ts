import { RootReducerType } from "@urbandhobi/@types";
import { getSupportedLaundry } from "@urbandhobi/actions";
import { setSupportedLaundry } from "@urbandhobi/redux/laundry/laundry.actions";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.laundry.data;

export const useCloth = () => {
  const dispatch = useDispatch();
  const cloths = useSelector(clothSelector, shallowEqual);

  const getCloths = useCallback(async () => {
    const res = await getSupportedLaundry();
    if (res) {
      dispatch(setSupportedLaundry(res));
    }
  }, []);

  return {
    getCloths,
    cloths,
  };
};

