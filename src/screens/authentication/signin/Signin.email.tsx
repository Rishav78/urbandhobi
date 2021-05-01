import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { ResponseToken } from "@urbandhobi/@types";
import { Seperator, Input, Button } from "@urbandhobi/components";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { api } from "@urbandhobi/lib/config";
import { Heading } from "../components";
import { setVerified, signIn } from "@urbandhobi/redux/authentication/auth.action";
import { setTokens } from "@urbandhobi/lib/helpers";
import Header from "@urbandhobi/components/header/Header";
import { isVerified } from "@urbandhobi/actions";

export interface SigninForm {
  email: string;
  password: string;
}

export interface SigninWithEmailProps { }

const form: UseFormProps = {
  action: api.auth.SIGNIN,
  method: "POST",
  fields: [
    {
      name: "email",
      type: "email",
      validate: true,
    },
    {
      name: "password",
      type: "password",
      validate: true,
    },
  ],
};

export const SigninWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const dispatch = useDispatch();
  const { getValue, setValue, submit, error } = useForm<SigninForm>(form, { username: "", password: "" });

  const { email, password } = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("email", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const {access, refresh} = await submit<ResponseToken>();
      await setTokens(access, refresh);
      // if (await isVerified()) {
        dispatch(setVerified(true));
      // }
      dispatch(signIn());
    }
    catch (err) {
      Alert.alert(err.message);
    }
  }, []);

  return (
    <>
      <Header
        headerLeftContainerStyle={styles.headerleft}
        headerContainerStyle={styles.header} />
      <View style={styles.container}>
        <Heading
          title="LOGIN"
          subTitle="LOGIN with your email and password"
          contentContainerStyle={styles.heading} />
        <Seperator contentContainerStyle={styles.seprator} />
        <View style={styles.form}>
          <Input
            onChangeText={onEmailChangeHandler}
            value={email}
            keyboardType="email-address"
            contentContainerStyle={styles.inputContainer}
            style={[styles.input]}
            placeholder="Email" />

          <Input
            onChangeText={onPasswordChangeHandler}
            value={password}
            secureTextEntry
            contentContainerStyle={styles.inputContainer}
            style={[styles.input]}
            placeholder="Password" />
        </View>
        <Button
          disabled={disable}
          onPress={onSubmit}
          style={styles.button}
          title="LOGIN" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  headerleft: {
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  seprator: {
    marginVertical: 30,
  },
  form: {
    marginHorizontal: 15,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 0,
    paddingVertical: 5,
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
