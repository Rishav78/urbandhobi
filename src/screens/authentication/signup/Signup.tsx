import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { ResponseToken } from "@urbandhobi/@types";
import { Seperator, Input, Button } from "@urbandhobi/components";
import Header from "@urbandhobi/components/header/Header";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { api } from "@urbandhobi/lib/config";
import { getValidator } from "@urbandhobi/lib/helpers/validator";
import { signIn } from "@urbandhobi/redux/authentication/auth.action";
import { Heading } from "../components";
import { useNavigate } from "@urbandhobi/hooks/navigation";

export interface SignupForm {
  email: string;
  password: string;
  confirm: string;
}

export interface SignupWithEmailProps { }

const form: UseFormProps = {
  action: api.auth.SIGNUP,
  method: "PUT",
  fields: [
    {
      name: "email",
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
  const dispatch = useDispatch();
  const {navigateToSignin} = useNavigate();
  const { getValue, setValue, submit, error } = useForm<SignupForm>(form, { username: "", password: "", confirm: "" });

  const { email, password, confirm } = getValue();
  const disable = error.error;

  const onEmailChangeHandler = useCallback((text: string) => {
    setValue<string>("email", text);
  }, []);

  const onPasswordChangeHandler = useCallback((text: string) => {
    setValue<string>("password", text);
  }, []);

  const onConfirmChangeHandler = useCallback((text: string) => {
    setValue("confirm", text);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      await submit<ResponseToken>();
      Alert.alert("ACCOUNT CREATED", undefined, [
        {
          text: "Ok",
          onPress: () => navigateToSignin(),
          style: "default",
        },
      ]);
      // await AsyncStorage.setItem("token", token);
      // await AsyncStorage.setItem("refreshToken", refreshToken);
      // dispatch(signIn());
      // navigateToCreateUser();
    }
    catch (err) {
      console.error(err);
      Alert.alert(err.message);
    }
  }, [confirm]);

  return (
    <>
      <Header
        headerLeftContainerStyle={styles.headerleft}
        headerContainerStyle={styles.header} />
      <View style={styles.container}>
        <Heading
          title="SIGNUP"
          subTitle="SIGNUP with your email and password"
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
