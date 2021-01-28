import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SigninResponse } from "../../../@types";
import { Seperator, Input, Button } from "../../../components";
import { useForm, UseFormProps } from "../../../hooks/form";
import { api } from "../../../lib/config";
import { getValidator } from "../../../lib/helpers/validator";
import { Heading } from "../components";

export interface SignupForm {
  username: string;
  password: string;
  confirm: string;
}

export interface SignupWithEmailProps {}

const form: UseFormProps = {
  action: api.auth.SIGNUP,
  method: "POST",
  fields: [
    {
      name: "username",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
    {
      name: "confirm",
      type: "string",
      validator: (confirm, data) => {
        getValidator()
          .comparePassword(data.password, confirm);
        return true;
      },
      send: false,
    },
  ],
};

export const SignupWithEmailScreen: React.FC<SignupWithEmailProps> = ({ }) => {
  const { getValue, setValue, submit, error } = useForm<SignupForm>(form, {username: "", password: "", confirm: ""});

  const {username, password, confirm} = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onConfirmChangeHandler = useCallback((text: string) => {
    setValue("confirm", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await submit<SigninResponse>();
      Alert.alert("Success");
    }
    catch (err) {
      Alert.alert(err.message);
    }
  }, [confirm]);

  return (
    <View style={styles.container}>
      <Heading
        title="SIGNUP"
        subTitle="SIGNUP with your email and password"
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

        <Input
          onChangeText={onConfirmChangeHandler}
          value={confirm}
          secureTextEntry
          contentContainerStyle={styles.inputContainer}
          style={[styles.input]}
          placeholder="Confirm Password" />
      </View>
      <Button
        disabled={disable}
        onPress={onSubmit}
        style={styles.button}
        title="CREATE ACCOUNT" />
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
