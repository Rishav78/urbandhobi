import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { FieldData, SigninResponse } from "../../../@types";
import { Seperator, Input, Button } from "../../../components";
import { useForm } from "../../../hooks/form";
import { api } from "../../../lib/config";
import { getValidator } from "../../../lib/helpers/validator";
import { Heading } from "../components";

export interface SigninForm {
  username: string;
  password: string;
}

export interface SigninWithEmailProps {
  a?: string;
}

const fields: FieldData[] = [
  {
    name: "username",
    type: "email",
    value: "",
  },
  {
    name: "password",
    type: "password",
    value: "",
  },
  {
    name: "confirm",
    type: "string",
    value: "",
    validator: (confirm, data) => {
      getValidator()
        .comparePassword(data.password.value, confirm);
      return true;
    },
    send: false,
  },
];

export const SignupWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const { data, setFieldValue, submit } = useForm(api.auth.SIGNUP, "POST", fields);

  const username = data.username.value;
  const password = data.password.value;
  const confirm = data.confirm.value;

  const onEmailChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("password", text);
  }, []);

  const onConfirmChangeHandler = useCallback((text: string) => {
    setFieldValue("confirm", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await submit<SigninResponse>();
      Alert.alert("Success");
    }
    catch (error) {
      Alert.alert(error.message);
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
          style={[styles.input]}
          placeholder="Email" />

        <Input
          onChangeText={onPasswordChangeHandler}
          value={password}
          style={[styles.input]}
          placeholder="Password" />

        <Input
          onChangeText={onConfirmChangeHandler}
          value={confirm}
          style={[styles.input]}
          placeholder="Confirm Password" />
      </View>
      <Button
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
  input: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  button: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
