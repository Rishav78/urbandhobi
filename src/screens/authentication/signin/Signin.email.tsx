import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { ResponseToken } from "../../../@types";
import { Seperator, Input, Button } from "../../../components";
import { useForm, UseFormProps } from "../../../hooks/form";
import { api } from "../../../lib/config";
import { Heading } from "../components";
import { signIn } from "../../../redux/authentication/auth.action";
import { setTokens } from "../../../lib/helpers";
import Header from "../../../components/header/Header";

export interface SigninForm {
  username: string;
  password: string;
}

export interface SigninWithEmailProps { }

const form: UseFormProps = {
  action: api.auth.SIGNIN,
  method: "POST",
  fields: [
    {
      name: "username",
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

  const { username, password } = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const { refreshToken, token } = await submit<ResponseToken>();
      await setTokens(token, refreshToken);
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
            value={username}
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
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
