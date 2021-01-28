import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SigninResponse } from "../../../@types";
import { Seperator, Input, Button } from "../../../components";
import { useForm, UseFormProps } from "../../../hooks/form";
import { api } from "../../../lib/config";
import { Heading } from "../components";

export interface SigninForm {
  username: string;
  password: string;
}

export interface SigninWithEmailProps {}

const form: UseFormProps = {
  action: api.auth.SIGNIN,
  method: "POST",
  fields: [
    {
      name: "username",
      type: "email",
      value: "",
      validate: true,
    },
    {
      name: "password",
      type: "password",
      value: "",
      validate: true,
    },
  ],
};

export const SigninWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const { getValue, setValue, submit, error } = useForm(form);

  const {username, password} = getValue<SigninForm>();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await submit<SigninResponse>();
      Alert.alert("Success");
    }
    catch (err) {
      Alert.alert(err.message);
    }
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
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
