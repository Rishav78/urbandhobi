import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { APIError, FieldData, Response, SigninResponse } from "../../@types";
import { Seperator, Input, Button } from "../../components";
import { useForm } from "../../hooks/form";
import { api } from "../../lib/config";
import { Heading } from "./components";

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

export const SigninWithEmailScreen: React.FC<SigninWithEmailProps> = ({ }) => {
  const { data, setFieldValue, submit } = useForm(api.auth.SIGNIN, "POST", fields);

  const onEmailChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("username", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setFieldValue<string>("password", text);
  }, []);

  const onSubmit = useCallback(async () => {
    const res = await submit<Response<SigninResponse | APIError>>();
    if (res.code === 200) {
      const r = res.data as SigninResponse;
      Alert.alert("Success");
      console.log(r.token);
    }
    else {
      const {error} = res.data as APIError;
      Alert.alert(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Heading contentContainerStyle={styles.heading} method="email" />
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
      </View>
      <Button
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
  input: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  button: {
    marginHorizontal: 15,
  },
});
