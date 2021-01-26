import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { screens } from "../lib/constants";

export const useNavigate = () => {
  const navigation = useNavigation();

  const navigateToSignin = useCallback(() => {
    navigation.navigate(screens.signin.name);
  }, []);

  const navigateToSignup = useCallback(() => {
    navigation.navigate(screens.signup.name);
  }, []);

  return {
    navigation,
    navigateToSignin,
    navigateToSignup,
  };
};
