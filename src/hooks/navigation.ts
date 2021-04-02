import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { screens } from "@urbandhobi/lib/constants";
import { Service } from "@urbandhobi/@types";

export const useNavigate = () => {
  const navigation = useNavigation();
  const {authStack, homeStack} = screens;

  const navigateToSignin = useCallback(() => {
    navigation.navigate(authStack.screen.signin.name);
  }, []);

  const navigateToSignup = useCallback(() => {
    navigation.navigate(authStack.screen.signup.name);
  }, []);

  const navigateToHome = useCallback(() => {
    navigation.navigate(homeStack.screen.home.name);
  }, []);

  const navigateToAddress = useCallback(() => {
    navigation.navigate(homeStack.screen.address.name);
  }, []);

  const navigateToAddAddress = useCallback(() => {
    navigation.navigate(homeStack.screen.addAddress.name);
  }, []);

  const navigateToCreateUser = useCallback(() => {
    navigation.navigate(authStack.screen.userinfo.name);
  }, []);

  const navigateToCart = useCallback(() => {
    navigation.navigate(homeStack.screen.cart.name);
  }, []);

  const navigateToService = useCallback((data: {service: Service}) => {
    navigation.navigate(homeStack.screen.service.name, data);
  }, []);

  const navigateToTiming = useCallback(() => {
    navigation.navigate(homeStack.screen.pickupTiming.name);
  }, []);

  return {
    navigation,
    navigateToSignin,
    navigateToSignup,
    navigateToHome,
    navigateToAddress,
    navigateToAddAddress,
    navigateToCreateUser,
    navigateToCart,
    navigateToService,
    navigateToTiming,
  };
};
