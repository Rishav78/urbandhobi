import { RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setUser } from "@urbandhobi/redux/user/user.action";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const userSelector = (state: RootReducerType) => state.user.data;

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector, shallowEqual);

  const getUser = useCallback(async () => {
    const service = new Service().user();
    const usr = await service.get();
    if (usr) {
      dispatch(setUser(usr));
    }
  }, []);

  return {
    user,
    getUser,
  };
};
