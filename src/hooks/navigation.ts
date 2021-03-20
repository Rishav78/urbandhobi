import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { screens } from "@urbandhobi/lib/constants";

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

  const navigateToWash = useCallback(() => {
    navigation.navigate(homeStack.screen.wash.name);
  }, []);

  const navigateToWashAndIron = useCallback(() => {
    navigation.navigate(homeStack.screen.washAndIron.name);
  }, []);

  const navigateToWashAndFold = useCallback(() => {
    navigation.navigate(homeStack.screen.washAndFold.name);
  }, []);

  const navigateToCart = useCallback(() => {
    navigation.navigate(homeStack.screen.cart.name);
  }, []);

  return {
    navigation,
    navigateToSignin,
    navigateToSignup,
    navigateToHome,
    navigateToAddress,
    navigateToAddAddress,
    navigateToCreateUser,
    navigateToWash,
    navigateToWashAndIron,
    navigateToWashAndFold,
    navigateToCart,
  };
};
