import { resetTokens } from "@urbandhobi/lib/helpers";
import { resetAuth } from "@urbandhobi/redux/authentication/auth.action";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const disatch = useDispatch();

  const logout = useCallback(async () => {
    await resetTokens();
    disatch(resetAuth());
  }, []);

  return {
    logout,
  };
};
