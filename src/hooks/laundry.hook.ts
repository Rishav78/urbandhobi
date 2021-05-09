import { RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setRequests } from "@urbandhobi/redux/laundry/laundry.action";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const requestSelector = (state: RootReducerType) => state.laundry.data;

export const useLaundry = () => {
  const dispatch = useDispatch();

  const requests = useSelector(requestSelector, shallowEqual);

  const getRequests = useCallback(async () => {
    const service = new Service().laundry();
    const res = await service.get();
    if (res) {
      dispatch(setRequests(res));
    }
  }, []);

  return {
    requests,
    getRequests,
  };
};
