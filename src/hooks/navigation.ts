import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { screens } from "../lib/constants";

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

  return {
    navigation,
    navigateToSignin,
    navigateToSignup,
    navigateToHome,
    navigateToAddress,
  };
};
