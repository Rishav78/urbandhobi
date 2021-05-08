import { RootReducerType } from "@urbandhobi/@types";
import Service from "@urbandhobi/lib/service";
import { setServices, setServiceState, setServiceType } from "@urbandhobi/redux/services/services.action";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const serviceSelector = (state: RootReducerType) => state.services.services;
const serviceTypeSelector = (state: RootReducerType) => state.services.serviceType;
const serviceStatesSelector = (state: RootReducerType) => state.services.serviceState;

export const useService = () => {
  const dispatch = useDispatch();

  const services = useSelector(serviceSelector, shallowEqual);
  const serviceType = useSelector(serviceTypeSelector, shallowEqual);
  const serviceStates = useSelector(serviceStatesSelector, shallowEqual);

  const getAndSetService = useCallback(async () => {
    const res = await new Service().services().getServices();
    if (res) {
      dispatch(setServices(res));
    }
  }, []);

  const getAndSetServiceType = useCallback(async () => {
    const types = await new Service().services().getServiceTypes();
    if (types) {
      dispatch(setServiceType(types));
    }
  }, []);

  const getServiceStates = useCallback(async () => {
    const service = new Service().services();
    const state = await service.getAvailableStates();
    if (state) {
      dispatch(setServiceState(state));
    }
  }, []);

  return {
    services,
    serviceType,
    serviceStates,
    getAndSetService,
    getAndSetServiceType,
    getServiceStates,
  };
};
