import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { screens } from "../lib/constants";

export const useNavigate = () => {
  const navigation = useNavigation();
  const {authStack: {screen}} = screens;
  const navigateToSignin = useCallback(() => {
    navigation.navigate(screen.signin.name);
  }, []);

  const navigateToSignup = useCallback(() => {
    navigation.navigate(screen.signup.name);
  }, []);

  return {
    navigation,
    navigateToSignin,
    navigateToSignup,
  };
};
