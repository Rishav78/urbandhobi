import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { FieldData, SigninResponse } from "../../../@types";
import { Seperator, Input, Button } from "../../../components";
import { useForm } from "../../../hooks/form";
import { api } from "../../../lib/config";
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
];

export const SignupWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const { data, setFieldValue, submit } = useForm(api.auth.SIGNIN, "POST", fields);
  const [confirm, setConfirm] = useState<string>("");

  const onEmailChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("password", text);
  }, []);

  const onConfirmChangeHandler = useCallback((text: string) => {
    setConfirm(text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      if (!confirm) {
        throw new Error("Confirm password can not be empty");
      }
      if (confirm !== data.password) {
        throw new Error("password does not match");
      }
      await submit<SigninResponse>();
      Alert.alert("Success");
    }
    catch (error) {
      Alert.alert(error.message);
    }
  }, [data, confirm]);

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
          value={data.username}
          style={[styles.input]}
          placeholder="Email" />

        <Input
          onChangeText={onPasswordChangeHandler}
          value={data.password}
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