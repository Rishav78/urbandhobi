import { RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setCloth } from "@urbandhobi/redux/cloth/cloth.actions";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const clothSelector = (state: RootReducerType) => state.cloth.data;

export const useCloth = () => {
  const dispatch = useDispatch();
  const clothes = useSelector(clothSelector, shallowEqual);
  const clothArray = Object.values(clothes);

  const getCloths = useCallback(async () => {
    const service = new Service().cloth();
    const res = await service.get();
    if (res) {
      dispatch(setCloth(res));
    }
  }, []);

  return {
    getCloths,
    clothes,
    clothArray,
  };
};

